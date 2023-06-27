import {Task} from "../models/TaskInterface";

interface AIVideoProcessor {
    // Returns bool on success / fail
    process(task: Task): Promise<boolean>
}

export { AIVideoProcessor }
