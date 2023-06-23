import {TaskService} from "./TaskService";
import {Task} from "../models/TaskInterface";

class TaskServiceImpl implements TaskService {

    private taskQueue: Task[] = []

    private taskResults: Record<string, boolean> = {}

    public dequeue(): Task | undefined {
        return undefined;
    }

    public enqueue(task: Task): void {
    }

    public setResult(taskId: string, result: boolean): void {
    }

}

export { TaskServiceImpl }
