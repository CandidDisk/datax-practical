import {TaskServiceImpl} from "./services/TaskServiceImpl";
import {Task} from "./models/TaskInterface";

const taskService = new TaskServiceImpl()

const task: Task = {
    taskId: "1",
    data: "Ta"
}

taskService.enqueue(task)
// const dequeuedTask = taskService.dequeue()
// console.log(dequeuedTask)

// taskService.setResult(task.taskId, true)
// console.log(taskService.getResult(task.taskId))


taskService.processNextTask().then(r => {
    console.log(r)
    taskService.getResult(task.taskId)
})
