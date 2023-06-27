import {Task} from "../models/TaskInterface";

interface TaskService {
    // Returns void
    enqueue(task: Task): void

    // Returns task on success, undefined on fail (presumed no existing tasks left)
    dequeue(): Promise<Task | undefined>

    // Returns void
    setResult(taskId: string, result: boolean): Promise<void>

    // Returns string, bool record on success. Undefined on fail (presumed taskId not found)
    getResult(taskId: string): Promise<Record<string, boolean> | undefined>

    // Returns bool on success and fail
    processNextTask(retryCount?: number, retryTask?: Task): Promise<boolean>
}

export { TaskService }
