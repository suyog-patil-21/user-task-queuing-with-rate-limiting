const task =  async function task(user_id) {
    console.log(`${user_id}-task completed at-${Date.now()}`)
    // this should be stored in a log file
}

exports.task = task;