const { Queue, Worker, QueueEvents } = require('bullmq');
const { REDIS_HOST, REDIS_PORT } = require("./redis-config");
const { task } = require("../service/task.service");
const { logger } = require('./logger');

const USER_JOB_QUEUE = "TaskQueue";

const userTaskQueue = new Queue(USER_JOB_QUEUE, {
    connection: {
        host: REDIS_HOST,
        port: REDIS_PORT
    },
    limiter: {
        groupKey: 'user_id',
    }
});

const userTaskWorker = new Worker(USER_JOB_QUEUE, async (job) => {
    logger.info(`Task Queue Job Id: ${job.name} for Started Working`);
    await task(job.data.user_id);
    return job.data.user_id;
}, {
    connection: {
        host: REDIS_HOST,
        port: REDIS_PORT
    },
    limiter: {
        max: 1,
        duration:  1000,
        groupKey: 'user_id',
    }
});

const userTaskQueueEvents = new QueueEvents(USER_JOB_QUEUE);
userTaskQueueEvents.on('completed', (jobId) => {
    logger.info(`Task Queue Job Id: ${JSON.stringify(jobId)} Completed`);
});

userTaskQueueEvents.on('failed', (job) => {
    logger.info(`Task Queue Job Id: ${JSON.stringify(job.data.user_id)} Failed`);
});

userTaskQueueEvents.on(
    'progress',
    ({ jobId, data }) => {
        logger.info(`Task Queue Job Id: ${JSON.stringify(jobId.data.user_id)} in Progress State`);
    }
);


exports.userTaskQueue = userTaskQueue;
exports.userTaskWorker = userTaskWorker;

