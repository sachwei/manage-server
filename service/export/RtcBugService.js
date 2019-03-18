let ExportService = require('./ExportService');
let utils = require('./../../utils/utils')

class RtcTaskService extends ExportService {
  initParam () {
    this.enumTypes = ['BUG_LEVEL', 'BUG_STATE']
    this.tableConfigs = [
      { tableName: 'users' },
      { tableName: 'orgs' },
      { tableName: 'sprints' },
      { tableName: 'products' }
    ]
    this.header = [
      { header: '类型', width: 8 },
      { header: '标识', width: 8 },
      { header: '摘要', width: 30 },
      { header: '归档依据', width: 15 },
      { header: '计划目标', width: 8 },
      { header: '估算值', width: 7 },
      { header: '严重性', width: 8 },
      { header: '优先级', width: 8 },
      { header: '是否用例发现', width: 8 },
      { header: '解决日期', width: 12 },
      { header: '解决人', width: 8 },
      { header: '创建日期', width: 12 },
      { header: '创建者', width: 8 },
      { header: '所有者', width: 8 },
      { header: '耗用时间', width: 8 },
      { header: '描述', width: 8 },
      { header: '父代', width: 8 },
      { header: '相关', width: 8 }
    ]
  }

  formateData (dataList) {
    return new Promise((resolve, reject) => {
      let rowDatas = []
      let data = {}
      for (let i = 0, len = dataList.length; i < len; i++) {
        data = dataList[i]
        rowDatas.push([
          '故事',
          data.id,
          data.name,
          this.dataFormater('orgs', data.orgId),
          this.dataFormater('sprints', data.sprintId),
          '',
          this.dataFormater('BUG_LEVEL', data.level),
          this.dataFormater('BUG_LEVEL', data.level),
          '是',
          this.calcCloseDate(data), // 解决日期
          this.calcDevUser(data), // 解决人
          this.dateFormater(data.createTime, 'yyyy-MM-dd'),
          this.dataFormater('users', data.commitUser, 'email', 'userName'),
          this.dataFormater('users', data.commitUser, 'email', 'userName'),
          this.calcCostTime(data), // 耗用时间,
          '',
          data.backlogId || '',
          ''
        ])
      }
      resolve(rowDatas)
    })
  }

  calcTestUser (data) {
    let result = ''
    if (data.state === 5) {
      let orbit
      for (let i = data.orbits.length - 1; i >= 0; i--) {
        orbit = data.orbits[i]
        if (orbit.state === 2) {
          result = orbit.toUserId
          break
        }
      }
    }
    return this.dataFormater('users', result, 'email', 'userName')
  }

  calcDevUser (data) {
    let result = ''
    if (data.state === 5) {
      let orbit
      for (let i = data.orbits.length - 1; i >= 0; i--) {
        orbit = data.orbits[i]
        if (orbit.state === 3) {
          result = orbit.toUserId
          break
        }
      }
    }
    return this.dataFormater('users', result, 'email', 'userName')
  }

  calcCloseDate (data) {
    let result = ''
    if (data.state === 5) {
      let lastTime = data.orbits[data.orbits.length - 1].optTime;
      result = this.dateFormater(lastTime, 'yyyy-MM-dd')
    }
    return result
  }

  calcCostTime (data) {
    let result = 0
    // 已关闭
    if (data.state === 5) {
      let lastTime = data.orbits[data.orbits.length - 1].optTime;
      result = utils.subDate(lastTime, data.createTime)
    } else {
      result = utils.subDate(new Date(), data.createTime)
    }
    return result;
  }
}

module.exports = new RtcTaskService()