import {describe, expect, test, afterEach, jest} from '@jest/globals';

import {TaskServiceImpl} from "../services/TaskServiceImpl";
import {AIVideoProcessorImpl} from "../services/AIVideoProcessorImpl";

import {Task} from "../models/TaskInterface";
import Redis from "ioredis-mock";

describe('taskService', () => {
    let taskService = new TaskServiceImpl()
    let aiVideoProcessor = new AIVideoProcessorImpl()

    const Redis = require('ioredis-mock')

    const dummyTaskQueue = [
        {
            taskId: "1",
            data: "Test 1"
        },
        {
            taskId: "2",
            data: "Test 2"
        },
    ]

    let redis = new Redis({
        // `options.data` does not exist in `ioredis`, only `ioredis-mock`
        data: {
            taskQueue: []
        },
    })

    // Reset jest mocks & mock redis db
    afterEach(() => {
        jest.clearAllMocks()
        redis.flushall()
    });

    taskService.redisClient = redis

    // Test enqueue single task to redis list
    test('enqueue should enqueue task to redis list', async () => {
        const task: Task = { taskId: '2', data: 'Test 2' }

        await taskService.enqueue(task)

        const listLength = await redis.llen(taskService.redisQueueKey)

        expect(listLength).toEqual(1)
    })

    // Test dequeue single task from redis list
    test('dequeue should dequeue single task from redis list', async () => {
        const expectedTask: Task = dummyTaskQueue[0]
        await redis.rpush("taskQueue", JSON.stringify(expectedTask))
        const task = await taskService.dequeue()
        expect(task).toEqual(expectedTask)
    })

    // Test dequeue w/ no tasks should return undefined
    test('dequeue should return undefined when no tasks in redis list', async () => {
        const task = await taskService.dequeue()
        expect(task).toEqual(undefined)
    })

    // Test setResult sets task id key with result value in redis
    test('setResult should set taskId key with result value in redis', async () => {
        const taskId = "1"
        const value = true

        await taskService.setResult(taskId, value)

        const result = await redis.get(taskId)
        expect(JSON.parse(result)).toEqual(value)
    })

    // Test getResult should return result value corresponding to taskId in redis
    test('getResult should return value of taskId in redis', async () => {
        const taskId = "1"
        const value = false

        await redis.set(taskId, JSON.stringify(value))

        const result = await taskService.getResult(taskId)

        expect(result).toEqual(value)
    })

    // Test getResult should return undefined if the key is not found in redis
    test('getResult should return undefined if task is not found', async () => {
        const taskId = "1"
        const value = false

        const result = await taskService.getResult(taskId)

        expect(result).toEqual(undefined)
    })

    // Test processNextTask should successfully process the first task from the queue with two tasks
    test('processNextTask should successfully process dequeued task from redis', async () => {
        dummyTaskQueue.map(async (task) => {
            await redis.rpush("taskQueue", JSON.stringify(task))
        })

        const result = true

        const processResult = await taskService.processNextTask(undefined, undefined, true)

        expect(processResult).toEqual(result)
    })

    // Test processNextTask should unsuccessfully process the first task from the queue with two tasks
    test('processNextTask should unsuccessfully process dequeued task from redis', async () => {
        dummyTaskQueue.map(async (task) => {
            await redis.rpush("taskQueue", JSON.stringify(task))
        })

        const result = false

        const processResult = await taskService.processNextTask(undefined, undefined, false)

        expect(processResult).toEqual(result)
    })
})
