import {AIVideoProcessor} from "./AIVideoProcessor";
import {Task} from "../models/TaskInterface";

class AIVideoProcessorImpl implements AIVideoProcessor {
    public async process(task: Task): Promise<boolean> {
        const processTime = task.data.length * 1000

        const result = await dummyProcessing(processTime)

        return result
    }

}

const dummyProcessing = async (processTime: number): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, processTime)
    })
}

export { AIVideoProcessorImpl }
