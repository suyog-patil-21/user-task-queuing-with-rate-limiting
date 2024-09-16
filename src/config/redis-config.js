const { createClient } = require('redis');

let redisClient;

const connectRedis = async () => {
    redisClient = createClient({
        host: '127.0.0.1',
        port: 6379,
    });
    redisClient.on('error', err => console.log('Redis Client Error', err));
    await redisClient.connect();
}

const getRedisClient = () => redisClient;


exports.connectRedis = connectRedis;
exports.getRedisClient = getRedisClient;