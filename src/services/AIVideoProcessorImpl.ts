import {AIVideoProcessor} from "./AIVideoProcessor";
import {Task} from "../models/TaskInterface";

class AIVideoProcessorImpl implements AIVideoProcessor {
    public async process(task: Task, testResult?: boolean): Promise<boolean> {
        const processTime = task.data.length * 100

        const result = await dummyProcessing(processTime, testResult)

        return result
    }

}

// Outside unit tests, testResult will be undefined.
// If randomly generated number thresholds, then reject to simulate fail. Otherwise, resolve to simulate success
// During unit tests, dummyProcessing will return testResult passed from unit test
const dummyProcessing = async (processTime: number, testResult?: boolean): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        setTimeout(() => {
            if (testResult === undefined) {
                const random = Math.random() * (10 - 1) + 1
                if (random < 5) {
                    reject(false)
                }
                resolve(false)
            }
            if (testResult) {
                resolve(true)
            }
            reject(false)
        }, processTime)
    })
}

export { AIVideoProcessorImpl }
