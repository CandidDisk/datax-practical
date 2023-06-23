import {AIVideoProcessor} from "./AIVideoProccessor";
import {Task} from "../models/TaskInterface";

class AIVideoProcessorImpl implements AIVideoProcessor {
    process(task: Task): boolean {
        return true;
    }
}

export { AIVideoProcessorImpl }
