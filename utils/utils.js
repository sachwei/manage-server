/*
 * 公共方法.
 * @Author: 490232365@qq.com
 * @Date: 2018-07-09 10:51:18
 * @Last Modified time: 2018-07-09 10:51:18
 */

function merge (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {}
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }

  return target
}

const dataFormatter = (dataList, valueArr) => {
  if (valueArr) {
    let datas = []
    for (let i = 0, len = dataList.length; i < len; i++) {
      if (contains(valueArr, dataList[i].id)) {
        datas.push(dataList[i])
      }
    }
    var names = ''
    for (var i = 0; i < datas.length; i++) {
      if (i !== datas.length - 1) {
        names += (datas[i].name + ',')
      } else {
        names += datas[i].name
      }
    }
    return names
  } else {
    return ''
  }
}

/**
 * 判断数组中是否包含对象
 * @param {数组} arr
 * @param {查找的对象} obj
 */
function contains (arr, obj) {
  var i = arr.length
  while (i--) {
    if (arr[i] === obj) {
      return true
    }
  }
  return false
}

const appendTreeNode = (treeArray, item, idPropName = 'id', parentPropName = 'parentId', childrenPropName = 'children') => {
  if (treeArray == null || treeArray.length <= 0) return
  if (!item[parentPropName] || item[parentPropName] == null) {
    let i = treeArray.findIndex(p => p.sort > item.sort)
    if (i === -1) {
      i = treeArray.length
    }
    treeArray.splice(i, 0, item)
    return
  }
  for (var j = 0; j < treeArray.length; j++) {
    var value = treeArray[j]
    if (item[parentPropName] === value[idPropName]) {
      if (value[childrenPropName] && value[childrenPropName].length > 0) {
        let i = value[childrenPropName].findIndex(p => p.sort > item.sort)
        if (i === -1) {
          i = value[childrenPropName].length
        }
        value[childrenPropName].splice(i, 0, item)
      } else {
        value[childrenPropName] = []
        value[childrenPropName].push(item)
      }
    } else {
      appendTreeNode(value[childrenPropName], item, idPropName, parentPropName, childrenPropName)
    }
  }
}

/**
 * 格式化金额显示
 * @param {*金额} s
 * @param {*保留位数} n
 */
const formatMoney = (s, n) => {
  if (s === undefined) return ''
  n = n > 0 && n <= 20 ? n : 2
  s = parseFloat((s + '').replace(/[^\d\\.-]/g, '')).toFixed(n) + ''
  let l = s.split('.')[0].split('').reverse()
  let r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  }
  return t.split('').reverse().join('') + '.' + r
}

const getClientHeight = () => {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}

/**
 * 按保留位数补0
 * @param {*数值} number
 * @param {*保留位数} digits
 */
const fillZero = (number, digits) => {
  number = String(number)
  var length = number.length
  if (number.length < digits) {
    for (var i = 0; i < digits - length; i++) {
      number = '0' + number
    }
  }
  return number
}

/**
 * 格式化日期
 * @param {*日期毫秒} date
 */
const formatDate = (date) => {
  if (!date) {
    return ''
  }
  // 获取js 时间戳
  let curDate = new Date()
  // 存储转换值
  let s
  let date1 = new Date(date)

  if (date1.getFullYear() === curDate.getFullYear()) {
    s = this.fillZero(date1.getMonth() + 1, 2) + '-' + this.fillZero(date1.getDate(), 2)
  } else {
    // 其他年超过一天
    s = String(date1.getFullYear()).substr(2) + '-' + this.fillZero(date1.getMonth() + 1, 2) + '-' + this.fillZero(date1.getDate(), 2)
  }
  return s
}

/**
 * 格式化日期时间
 * @param {*日期毫秒} dateNum
 * @param {*日期显示格式} fmt "yyyy-MM-dd hh:mm:ss"或 "yyyy-MM-dd"
 */
const formatDateTime = (dateNum, fmt) => {
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

const userFormatter = (value, userList) => {
  let result = ''
  for (let i = 0, len = userList.length; i < len; i++) {
    if (userList[i].email === value) {
      result = userList[i].userName
    }
  }
  return result
}

/**
 * 对象深度复制
 * @param {*对象数组} source
 */
const deepCopy = (source) => {
  var sourceCopy = source instanceof Array ? [] : {}
  for (var item in source) {
    // typeof null 会返回 "object"，防止有属性为null时被复制为[object, object]
    if (source[item] == null) {
      sourceCopy[item] = source[item]
    } else {
      sourceCopy[item] = typeof source[item] === 'object' ? deepCopy(source[item]) : source[item]
    }
  }
  return sourceCopy
}

const subDate = (sDate, dDate) => {
  return (new Date(sDate).getTime() - new Date(dDate).getTime()) / 1000 / 60 / 60 / 24
}

/**
 * 判断同一天
 * @param {*} a
 * @param {*} b
 */
const eqDate = (a, b) => {
  let [start, end] = [new Date(a), new Date(b)]
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)
  return (start - end) === 0
}

/**
 * a日期小于b日期（到天）
 * @param {*} a
 * @param {*} b
 */
const ltDate = (a, b) => {
  let [start, end] = [new Date(a), new Date(b)]
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)
  return (end - start) > 0
}

/**
 * a日期大于b日期（到天）
 * @param {*} a
 * @param {*} b
 */
const gtDate = (a, b) => {
  let [start, end] = [new Date(a), new Date(b)]
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)
  return (start - end) > 0
}

/**
 * a日期小于等于b日期（到天）
 * @param {*} a
 * @param {*} b
 */
const lteDate = (a, b) => {
  let [start, end] = [new Date(a), new Date(b)]
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)
  return (end - start) >= 0
}

/**
 * a日期大于等于b日期（到天）
 * @param {*} a
 * @param {*} b
 */
const gteDate = (a, b) => {
  let [start, end] = [new Date(a), new Date(b)]
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)
  return (start - end) >= 0
}

module.exports = {
  merge,
  dataFormatter,
  formatMoney,
  getClientHeight,
  fillZero,
  formatDate,
  formatDateTime,
  deepCopy,
  userFormatter,
  subDate,
  eqDate,
  ltDate,
  gtDate,
  lteDate,
  gteDate
}
