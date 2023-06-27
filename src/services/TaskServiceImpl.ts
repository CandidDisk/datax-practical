import {TaskService} from "./TaskService";
import {Task} from "../models/TaskInterface";
import {AIVideoProcessorImpl} from "./AIVideoProcessorImpl";
import {redis} from "../config/redis";
import {v4 as uuidv4} from "uuid";

class TaskServiceImpl implements TaskService {

    public redisQueueKey: string = "taskQueue"

    public aiVideoProcessor = new AIVideoProcessorImpl()

    public redisClient = redis

    public async dequeue(): Promise<Task | undefined> {
        try {
            let task = await this.redisClient.lpop(this.redisQueueKey)

            if (!task) {
                return undefined
            }
            const returnTask: Task = JSON.parse(task)
            console.log(returnTask)
            return returnTask
        } catch (e) {
            console.error(e)
            return undefined
        }
    }

    public async enqueue(task: Task): Promise<void> {
        try {
            if (!task.taskId) {
                task.taskId = uuidv4()
            }

            await this.redisClient.rpush(
                this.redisQueueKey,
                JSON.stringify(task)
            )

            console.log('Pushed!')
        } catch (e) {
            console.error(e)
        }
    }

    public async setResult(taskId: string, result: boolean): Promise<void> {
        await this.redisClient.set(taskId, result ? 'true' : 'false')
    }

    async getResult(taskId: string): Promise<Record<string, boolean> | undefined> {
        const result = await this.redisClient.get(taskId)
        if (!result) {
            return undefined
        }
        return JSON.parse(result);
    }

    public async processNextTask(retryCount?: number, recursiveTask?: Task,  testResult?: boolean): Promise<boolean> {
        const currentCount = retryCount ? retryCount + 1 : 1

        const task = recursiveTask ? recursiveTask : await this.dequeue()
        if (!task) {
            console.error('`Error processing task: No task found')
            return false
        }

        let result = false

        try {
            result = await this.aiVideoProcessor.process(task, testResult)
            console.log(`Task processed: ${task.taskId}`)
        } catch (error) {
            console.error(`Error processing task: ${task.taskId}`)
            console.error(error)
        }

        if (result || currentCount > 3) {
            await this.setResult(task.taskId, result)
            console.log(`Final result ${result}`)
            return result
        }

        console.log(`Retrying task | Attempt ${currentCount}: ${task.taskId}`)
        const recursiveResponse = await this.processNextTask(currentCount, task, testResult)
        return recursiveResponse
    }
}

export { TaskServiceImpl }
