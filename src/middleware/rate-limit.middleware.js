const { getRedisClient } = require("../config/redis-config");

function rateLimitMiddleware({ rateLimitWindowInSeconds, maxRateLimit }) {
    return async function (req, res, next) {
        try {
            req.user_id = req.body.user_id;
            const redisClient = getRedisClient();
            const redisUserId = `rate_limit:${req.user_id}:per${rateLimitWindowInSeconds}s`;

            const requests = await redisClient.get(redisUserId);
            if (requests > maxRateLimit) {
                res.status(429).json({ "message": "too many requests" });
                return;
            }
            await redisClient.incr(redisUserId);
            await redisClient.expire(redisUserId, rateLimitWindowInSeconds);
            next();
        } catch (err) {
            console.log(`Error in rateLimit function: ${err}`);
        }
    }
}

exports.rateLimtiMiddleware = rateLimitMiddleware;