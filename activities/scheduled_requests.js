const schedule = require('node-schedule');
const socialTasks = require("social_media")

const scheduler = (cronitorInterval) => {
  schedule.scheduleJob(cronitorInterval, () => {
    for (let module of Object.keys(socialTasks)) {
      // Execute all the modules
      socialTasks[module]();
    }
  })
}

exports.twoHourUpdate = () => {
  // Schedule all tasks to run every 2 hours  
  scheduler("*/2 * * *");
}

exports.dailyUpdate = () => {
  scheduler("0 7 * * *");
}