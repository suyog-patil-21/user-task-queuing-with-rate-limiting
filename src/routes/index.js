const { Router } = require("express");

const router = Router();

router.use('/task',require("./task"));

module.exports = router;