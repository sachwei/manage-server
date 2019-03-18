var schedule = require("node-schedule");

class ScheduleService {
  constructor () {
    this.rule = {}
    this.task = {}
  }

  initRule () {}

  excute (params) {
    console.log('启动调度')
    this.rule = new schedule.RecurrenceRule();
    this.initRule()
    this.task = new schedule.scheduleJob(this.rule, this.runTask)
    this.runTask(params)
  }

  runTask () {}

  cancel () {
    if (this.task && this.task.cancel) {
      this.task.cancel()
    }
  }
}

module.exports = ScheduleService