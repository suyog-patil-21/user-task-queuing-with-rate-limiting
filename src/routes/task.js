const { Router } = require("express");
const { rateLimtiMiddleware } = require("../middleware/rate-limit.middleware");

const router = Router();

router.use(rateLimtiMiddleware({ rateLimitWindowInSeconds: 1, maxRateLimit: 1 }));
router.use(rateLimtiMiddleware({ rateLimitWindowInSeconds: 60, maxRateLimit: 20 }));

router.post("/", async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json({ "error": "user_id is required" });
    return res.status(200).send({ "message": "task Complete" });
});

module.exports = router;