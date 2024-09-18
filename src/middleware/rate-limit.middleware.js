const { logger } = require("../config/logger");
const { getRedisClient } = require("../config/redis-config");
const { userTaskQueue } = require("../config/bullmq-config");

const rateLimitPerUser = async ({ user_id, rateLimitWindowInSeconds, maxRateLimit }) => {
    const redisClient = getRedisClient();
    const redisUserId = `rate_limit:${user_id}:per${rateLimitWindowInSeconds}s`;

    const requestCount = await redisClient.incr(redisUserId);
    if (requestCount === 1) {
        await redisClient.expire(redisUserId, rateLimitWindowInSeconds);
    } else if (requestCount > maxRateLimit) {
        await userTaskQueue.add(`Job#${user_id}#${Date.now()}`, {
            user_id
        })
        return true;
    }
    return false;
};


async function rateLimitMiddleware(req, res, next) {
    try {
        const isSecondLimit = await rateLimitPerUser({ user_id: req.body.user_id, rateLimitWindowInSeconds: 1, maxRateLimit: 1 });
        if (isSecondLimit) {
            res.status(202).json({ "message": `Request will be processed after sometime.` });
            return;
        }
        const isMinLimit = await rateLimitPerUser({ user_id: req.body.user_id, rateLimitWindowInSeconds: 60, maxRateLimit: 20 });
        if (isMinLimit) {
            res.status(202).json({ "message": `Request will be processed after sometime.` });
            return;
        }
        next();
    } catch (err) {
        logger.error(`Error in rateLimitMiddleware function: ${err}\nStackTrace:`);
    }
}


exports.rateLimtiMiddleware = rateLimitMiddleware;