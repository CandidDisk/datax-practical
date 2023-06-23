import {Task} from "../models/TaskInterface";

interface TaskService {
    enqueue(task: Task): void
    dequeue(): Task | undefined
    setResult(taskId: string, result: boolean): void
}

export { TaskService }
