import {TaskServiceImpl} from "./services/TaskServiceImpl";
import {Task} from "./models/TaskInterface";

import { v4 as uuidv4 } from 'uuid';

const taskService = new TaskServiceImpl()

const task2: Task = {
    taskId: uuidv4(),
    data: "Ta"
}

const taskArr: Task[] = [
    {
        taskId: uuidv4(),
        data: "She's"
    },
    {
        taskId: uuidv4(),
        data: "My"
    },
    {
        taskId: uuidv4(),
        data: "Number pi"
    },
    {
        taskId: uuidv4(),
        data: "3 point 1 4 1 5 9"
    }
]

taskArr.map(async (task) => {
    await taskService.enqueue(task)
})

taskArr.map(async (task) => {
    await taskService.processNextTask().then(async (result) => {
        console.log(`Completed w/ task [${task.taskId}], result: ${result}`)
    })
})

