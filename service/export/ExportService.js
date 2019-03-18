let Mongodb = require('../../database/mongodb');
let exceljs = require('../../utils/exceljs')

class ExportService {
  constructor () {
    this.dataCache = []
    this.header = []
    this.enumTypes = []
    this.tableConfigs = []
  }

  getExcel (tableName, condition) {
    this.initParam()
    let workbook = exceljs.createWorkBook()
    let worksheet = workbook.getWorksheet(1)
    worksheet.columns = this.header
    exceljs.setFristRowStyle(worksheet)
    return new Promise((resolve, reject) => {
      initFormateData.call(this).then(() => {
        return getData(tableName, condition)
      }).then((data) => {
        return this.formateData.call(this, data)
      }).then((data) => {
        worksheet.addRows(data)
        exceljs.setDataRowStyle(worksheet, data)
        resolve(workbook)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  
  // 格式化数据
  dataFormater (key, id, idName = 'id', valueName = 'name') {
    if (id && this.dataCache[key] && this.dataCache[key].length > 0) {
      let data = this.dataCache[key].find(item => {
        return item[idName] === id
      })
      return data[valueName]
    } else {
      return ''
    }
  }

  // 格式化日期
  dateFormater (dateNum, fmt) {
    if (!dateNum) {
      return ''
    }
    var date = new Date(dateNum)
    var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
  
  // 初始化格式化需要数据
  initParam () {}

  // 子类覆盖该方法
  formateData (dataList) {}
}

// 私有方法
function getData (tableName, condition) {
  return new Promise((resolve, reject) => {
    let conditions = {}
    if (condition.query.like) {
      for (name in condition.query.like) {
        conditions[name] = new RegExp(condition.query.like[name], 'i')
      }
    } else {
      conditions = condition.query
    }
    Mongodb.find(tableName, conditions, {}, condition.sort, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

function getTableData (config) {
  return new Promise((resolve, reject) => {
    Mongodb.find(config.tableName, config.condition || {}, {}, {}, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        this.dataCache[config.tableName] = docs
        resolve();
      }
    });
  });
}

function getEnum (enumTypeKey) {
  return new Promise((resolve, reject) => {
    Mongodb.find('enumTypes', {key: enumTypeKey}, {}, {}, (err, docs) => {
      if(err) {
        reject(err);
      } else {
        if (docs && (docs.length === 1)) {
          Mongodb.find('enums', { enumTypeId: docs[0].id }, {}, {}, (err, docs) => {
            if (err) {
              reject(err);
            } else {
              this.dataCache[enumTypeKey] = docs
              resolve();
            }
          });
        } else {
          resolve([]);
        }
      }
    });
  });
}

function initFormateData () {
  return new Promise((resolve, reject) => {
    const enumPromise = this.enumTypes.map((key) => {
      return getEnum.call(this, key);
    });
    const baseInfoPromise = this.tableConfigs.map((config) => {
      return getTableData.call(this, config)
    })
    Promise.all(enumPromise.concat(baseInfoPromise)).then((data) => {
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}

module.exports = ExportService