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
        const task: Task = { taskId: '2', data: 'Test 2' };

        await taskService.enqueue(task)

        const listLength = await redis.llen(taskService.redisQueueKey)

        expect(listLength).toEqual(1)
    })

    // Test dequeue single task from redis list
    test('dequeue should dequeue single task from redis list', async () => {
        const expectedTask: Task = { taskId: "1", data: "Test 1" }
        await redis.rpush("taskQueue", JSON.stringify(expectedTask));
        const task = await taskService.dequeue()
        expect(task).toEqual(expectedTask)
    })

    // Test dequeue w/ no tasks should return undefined
    test('dequeue should return undefined when no tasks in redis list', async () => {
        const task = await taskService.dequeue()
        expect(task).toEqual(undefined)
    })
})
