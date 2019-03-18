let ExportService = require('./ExportService');

class RtcTaskService extends ExportService {
  initParam () {
    this.enumTypes = ['BACKLOG_WHERE']
    this.tableConfigs = [
      { tableName: 'users' },
      { tableName: 'orgs' },
      { tableName: 'sprints' }
    ]
    this.header = [
      { header: '类型', width: 5 },
      { header: '标识', width: 7 },
      { header: '摘要', width: 30 },
      { header: '归档依据', width: 15 },
      { header: '计划目标', width: 10 },
      { header: '估算值', width: 8 },
      { header: '优先级', width: 8 },
      { header: '实际开始时间', width: 12 },
      { header: '实际结束时间', width: 12 },
      { header: '研发类型', width: 8 },
      { header: '创建日期', width: 12 },
      { header: '创建者', width: 8 },
      { header: '所有者', width: 8 },
      { header: '耗用时间', width: 8 },
      { header: '描述', width: 8 },
      { header: '子代', width: 12 },
      { header: '相关', width: 12 }
    ]
  }

  formateData (dataList) {
    return new Promise((resolve, reject) => {
      let rowDatas = []
      let backlog, task
      for (let i = 0, len = dataList.length; i < len; i++) {
        backlog = dataList[i]
        for (let j = 0, len = backlog.tasks.length; j < len; j++) {
          task = backlog.tasks[j]
          rowDatas.push([
            '任务',
            backlog.id,
            backlog.name,
            this.dataFormater('orgs', backlog.orgId),
            this.dataFormater('sprints', backlog.sprintId),
            task.estimate,
            backlog.important,
            this.dateFormater(task.startDate, 'yyyy-MM-dd'),
            this.dateFormater(task.endDate, 'yyyy-MM-dd'),
            task.type,
            this.dateFormater(task.createDate, 'yyyy-MM-dd'),
            this.dataFormater('users', task.userId, 'email', 'userName'),
            this.dataFormater('users', task.userId, 'email', 'userName'),
            task.estimate,
            '',
            '',
            ''
          ])
        }
      }
      resolve(rowDatas)
    })
  }
}

module.exports = new RtcTaskService()