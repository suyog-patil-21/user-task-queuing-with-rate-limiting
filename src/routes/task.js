const { Router } = require("express");
const { rateLimtiMiddleware } = require("../middleware/rate-limit.middleware");
const { task } = require("../service/task.service");
const router = Router();


router.post("/",
    rateLimtiMiddleware,
    async (req, res) => {
        const { user_id } = req.body;

        if (!user_id) return res.status(400).json({ "error": "user_id is required" });

        await task(user_id);
        return res.status(200).send({ "message": "task Complete" });
    });

module.exports = router;