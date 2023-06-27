import {TaskService} from "./TaskService";
import {Task} from "../models/TaskInterface";
import {AIVideoProcessorImpl} from "./AIVideoProcessorImpl";
import {redis} from "../config/redis";

class TaskServiceImpl implements TaskService {

    private redisQueueKey: string = "taskQueue"

    private taskQueue: Task[] = []

    private taskResults: Record<string, boolean> = {}

    private aiVideoProcessor = new AIVideoProcessorImpl()

    public async dequeue(): Promise<Task | undefined> {
        try {
            let task = await redis.lpop(this.redisQueueKey)

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
            await redis.rpush(
                this.redisQueueKey,
                JSON.stringify(task)
            )
            console.log('Pushed!')
        } catch (e) {
            console.error(e)
        }
    }

    public async setResult(taskId: string, result: boolean): Promise<void> {
        this.taskResults[taskId] = result;
    }

    getResult(taskId: string): Record<string, boolean> | undefined {
        console.log(this.taskResults)
        return undefined;
    }

    public async processNextTask(): Promise<void> {
        const task = await this.dequeue()
        if (!task) {
            return
        }

        const result = await this.aiVideoProcessor.process(task)
        await this.setResult(task.taskId, result)
    }

}

export { TaskServiceImpl }
