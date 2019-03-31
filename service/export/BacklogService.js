let ExportService = require('./ExportService');

class RtcBacklogService extends ExportService {
  initParam () {
    this.enumTypes = ['BACKLOG_WHERE']
    this.tableConfigs = [
      { tableName: 'users' },
      { tableName: 'orgs' },
      { tableName: 'sprints' }
    ]
    this.header = [
      { header: '标识', width: 8 },
      { header: '摘要', width: 30 },
      { header: '计划目标', width: 10 },
      { header: '需求来源', width: 8 },
      { header: '需求分类', width: 12 },
      { header: '优先级', width: 8 },
      { header: '创建者', width: 8 },
      { header: '耗用时间', width: 8 },
      { header: '描述', width: 20 }
    ]
  }

  formateData (dataList) {
    return new Promise((resolve, reject) => {
      let rowDatas = []
      let backlog = {}
      for (let i = 0, len = dataList.length; i < len; i++) {
        backlog = dataList[i]
        rowDatas.push([
          backlog.id,
          backlog.name,
          this.dataFormater('sprints', backlog.sprintId),
          this.dataFormater('BACKLOG_WHERE', backlog.where),
          backlog.track,
          backlog.important,
          this.dataFormater('users', backlog.createUserId, 'email', 'userName'),
          backlog.estimate,
          'https://***.com/work/#/backlog/view/' + backlog.id
        ])
      }
      resolve(rowDatas)
    })
  }
}

module.exports = new RtcBacklogService()