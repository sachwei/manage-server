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
      { header: '类型', width: 8 },
      { header: '标识', width: 8 },
      { header: '摘要', width: 30 },
      { header: '归档依据', width: 15 },
      { header: '计划目标', width: 10 },
      { header: '故事点', width: 8 },
      { header: '需求来源', width: 8 },
      { header: '需求分类', width: 8 },
      { header: '优先级', width: 8 },
      { header: '对应储备项目', width: 8 },
      { header: '需求验收', width: 8 },
      { header: '创建者', width: 8 },
      { header: '所有者', width: 8 },
      { header: '耗用时间', width: 8 },
      { header: '描述', width: 8 },
      { header: '子代', width: 8 },
      { header: '相关', width: 8 }
    ]
  }

  formateData (dataList) {
    return new Promise((resolve, reject) => {
      let rowDatas = []
      let backlog = {}
      for (let i = 0, len = dataList.length; i < len; i++) {
        backlog = dataList[i]
        rowDatas.push([
          '故事',
          backlog.id,
          backlog.name,
          this.dataFormater('orgs', backlog.orgId),
          this.dataFormater('sprints', backlog.sprintId),
          backlog.estimate,
          this.dataFormater('BACKLOG_WHERE', backlog.where),
          this.dataFormater('BACKLOG_WHERE', backlog.where),
          backlog.important,
          '',
          '是',
          this.dataFormater('users', backlog.createUserId, 'email', 'userName'),
          this.dataFormater('users', backlog.createUserId, 'email', 'userName'),
          backlog.estimate,
          backlog.track,
          '',
          ''
        ])
      }
      resolve(rowDatas)
    })
  }
}

module.exports = new RtcBacklogService()