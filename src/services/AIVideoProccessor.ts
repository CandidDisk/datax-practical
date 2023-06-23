import {Task} from "../models/TaskInterface";

interface AIVideoProcessor {
    process(task: Task): boolean
}

export { AIVideoProcessor }
