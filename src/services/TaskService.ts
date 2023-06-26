import {Task} from "../models/TaskInterface";

interface TaskService {
    enqueue(task: Task): void
    dequeue(): Promise<Task | undefined>
    setResult(taskId: string, result: boolean): Promise<void>
    getResult(taskId: string): Record<string, boolean> | undefined
    processNextTask(): Promise<void>
}

export { TaskService }
