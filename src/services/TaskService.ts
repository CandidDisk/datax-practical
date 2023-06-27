import {Task} from "../models/TaskInterface";

interface TaskService {
    enqueue(task: Task): void
    dequeue(): Promise<Task | undefined>
    setResult(taskId: string, result: boolean): Promise<void>
    getResult(taskId: string): Promise<Record<string, boolean> | undefined>
    processNextTask(retryCount?: number, retryTask?: Task): Promise<boolean>
}

export { TaskService }
