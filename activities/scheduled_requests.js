const schedule = require('node-schedule');
const socialTasks = require("social_media")

exports.scheduledRequests = () => {
  // Schedule all tasks to run every 2 hours  
  schedule.scheduleJob("*/2 * * *", () => {
    // Run all tasks from ./social_media/index.js    
    for (let module of Object.keys(socialTasks)) {
      // Execute all the modules
      socialTasks[module]();
    }
  })
}