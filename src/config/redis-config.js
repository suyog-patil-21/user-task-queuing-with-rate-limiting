const { createClient } = require('redis');
const { logger } = require('./logger');

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_HOST || 6379;

let redisClient;

const connectRedis = async () => {
    redisClient = createClient({
        host: REDIS_HOST,
        port: REDIS_PORT,
    });
    redisClient.on('error', err => console.log('Redis Client Error', err));
    await redisClient.connect();
    logger.info("redis connected");
}

const getRedisClient = () => redisClient;


exports.connectRedis = connectRedis;
exports.getRedisClient = getRedisClient;
exports.REDIS_HOST = REDIS_HOST;
exports.REDIS_PORT = REDIS_PORT;