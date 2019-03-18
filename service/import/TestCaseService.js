let ImportService = require('./ImportService')

class TestCaseService extends ImportService{
  initParam () {
    this.enumTypes = ['TEST_CASE_LEVEL', 'TEST_CASE_TYPE']
  }

  formateData (dataList, { setId }) {
    return new Promise((resolve, reject) => {
      let rowDatas = []
      let data = {}
      // 1.数据转换
      for (let i = 0, len = dataList.length; i < len; i++) {
        data = dataList[i]
        rowDatas.push({
          "id": '',
          "name": data[0],
          "setId": data[1],
          "summary": data[2],
          "sort": this.dataFormater('TEST_CASE_LEVEL', data[3]),
          "type": this.dataFormater('TEST_CASE_TYPE', data[4]),
          "beforeCondition": data[5],
          'step':[{
            'sort': 1,
            'summary': data[6],
            'hope': data[7]
          }],
          "createUserId": this.user.email,
          "createTime": new Date(),
          "backlogId": Number(data[8]),
          "orgId": this.user.orgId[0]
        })        
      }

      // 2.合并数据(同名合并操作步骤); 设置用例集ID
      let dataMap = new Map()
      for (let i = 0, len = rowDatas.length; i < len; i++) {
        if (dataMap.has(rowDatas[i].name)) {
          let data = dataMap.get(rowDatas[i].name)
          let stepSort = data.step[data.step.length - 1].sort + 1
          let step = rowDatas[i].step[0]
          step.sort = stepSort          
          data.step.push(step)
        } else {
          if (isNaN(rowDatas[i].setId)) {          
            if (Number(setId) !== -1) {
              rowDatas[i].setId = Number(setId)
            } else {
              reject(new Error('未指定用例集'))
            }
          } else {
            rowDatas[i].setId = Number(rowDatas[i].setId)
          }
          dataMap.set(rowDatas[i].name, rowDatas[i])
        }
      }
      rowDatas = [...dataMap.values()]

      // 3.设置id
      this.getId('test_case_key', rowDatas.length).then(value => {        
        for (let i = 0, len = rowDatas.length; i < len; i++) {
          rowDatas[i].id = Number(value + i)
        }
        resolve(rowDatas)
      })
    })
  }
}

module.exports = new TestCaseService()