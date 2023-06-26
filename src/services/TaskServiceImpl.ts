import {TaskService} from "./TaskService";
import {Task} from "../models/TaskInterface";
import {AIVideoProcessorImpl} from "./AIVideoProcessorImpl";

class TaskServiceImpl implements TaskService {

    private taskQueue: Task[] = []

    private taskResults: Record<string, boolean> = {}

    private aiVideoProcessor = new AIVideoProcessorImpl()

    public async dequeue(): Promise<Task | undefined> {
        return this.taskQueue.shift()
    }

    public enqueue(task: Task): void {
        this.taskQueue.push(task)
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
        console.log('result')
        console.log(result)
        await this.setResult(task.taskId, result)
    }

}

export { TaskServiceImpl }
