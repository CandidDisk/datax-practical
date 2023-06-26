import {Task} from "../models/TaskInterface";

interface AIVideoProcessor {
    process(task: Task): Promise<boolean>
}

export { AIVideoProcessor }
