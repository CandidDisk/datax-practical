import {describe, expect, test} from '@jest/globals';

import {TaskServiceImpl} from "../services/TaskServiceImpl";
import {AIVideoProcessorImpl} from "../services/AIVideoProcessorImpl";

import {Task} from "../models/TaskInterface";

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

    const redis = new Redis({
        // `options.data` does not exist in `ioredis`, only `ioredis-mock`
        data: {
            taskQueue: []
        },
    })

    taskService.redisClient = redis

    test('enqueue should enqueue task to redis list', async () => {
        const task: Task = { taskId: '1', data: 'Test 1' };

        await taskService.enqueue(task)

        const listLength = await redis.llen(taskService.redisQueueKey)

        expect(listLength).toBeGreaterThan(0)
    })
})
