let ExportService = require('./ExportService');
let utils = require('./../../utils/utils')

class RtcTaskService extends ExportService {
  initParam () {
    this.enumTypes = ['BACKLOG_WHERE', 'BUG_LEVEL', 'BUG_STATE', 'BUG_REASON']
    this.tableConfigs = [
      { tableName: 'users' },
      { tableName: 'products' },
      { tableName: 'sprints' }
    ]
    this.header = [
      { header: '序号', width: 5 },
      { header: '编码', width: 7 },
      { header: '摘要', width: 80 },
      { header: '分类', width: 15 },
      { header: '状态', width: 8 },
      { header: '级别', width: 8 },
      { header: '原因', width: 8 },
      { header: '解决方法', width: 8 },
      { header: '开发处理人', width: 8 },
      { header: '测试处理人', width: 8 },
      { header: '提交人', width: 8 },
      { header: '创建日期', width: 12 },
      { header: '耗用时间', width: 8 }
    ]
  }

  formateData (dataList) {
    return new Promise((resolve, reject) => {
      let rowDatas = []
      let bug = {}
      for (let i = 0, len = dataList.length; i < len; i++) {
        bug = dataList[i]
        rowDatas.push([
          i + 1,
          bug.id,
          bug.name,
          bug.track,
          this.dataFormater('BUG_STATE', bug.state),
          this.dataFormater('BUG_LEVEL', bug.level),
          this.dataFormater('BUG_REASON', bug.solutionType),
          bug.solution,
          this.calcDevUser(bug),
          this.calcTestUser(bug),
          this.dataFormater('users', bug.commitUser, 'email', 'userName'),
          this.dateFormater(bug.createTime, 'yyyy-MM-dd'),
          this.calcCostTime(bug)
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
    let result = ''
    // 已关闭
    if (data.state === 5) {
      let lastTime = data.orbits[data.orbits.length - 1].optTime;
      result = utils.subDate(lastTime, data.createTime)
    }
    return result;
  }
}

module.exports = new RtcTaskService()