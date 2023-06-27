import {AIVideoProcessor} from "./AIVideoProcessor";
import {Task} from "../models/TaskInterface";

class AIVideoProcessorImpl implements AIVideoProcessor {
    public async process(task: Task): Promise<boolean> {
        const processTime = task.data.length * 100

        const result = await dummyProcessing(processTime)

        return result
    }

}

const dummyProcessing = async (processTime: number): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        setTimeout(() => {
            const random = Math.random() * (10 - 1) + 1
            if (random < 5) {
                reject(false)
            }
            resolve(true)
        }, processTime)
    })
}

export { AIVideoProcessorImpl }
