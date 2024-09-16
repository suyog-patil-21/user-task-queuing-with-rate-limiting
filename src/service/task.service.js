const { logger } = require("../config/logger");

const task =  async function task(user_id) {
    console.log(`${user_id}-task completed at-${Date.now()}`)
    // this should be stored in a log file
    logger.info(`${user_id}-task completed at-${Date.now()}`);
}

exports.task = task;