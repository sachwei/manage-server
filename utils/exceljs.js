let Excel = require('exceljs')

let ExcelUtil = function () {}

ExcelUtil.prototype.getData = (filePath) => {
  return new Promise((resolve, reject) => {
    let workbook = new Excel.Workbook()
    workbook.xlsx.readFile(filePath).then(() => {
      let worksheet = workbook.getWorksheet(1);
      let dataList = []
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          let rowData = []
          row.eachCell({
            includeEmpty: true
          }, (cell, colNumber) => {
            let value = cell.value;
            if (!value) {
                value = '';
            }
            rowData.push(value);
          });
          dataList.push(rowData)
        }        
      })
      resolve(dataList);
    })
  })
}

ExcelUtil.prototype.createWorkBook = () => {
  let workbook = new Excel.Workbook()
  for (let i = 1, len = 4; i < len; i++) {
    workbook.addWorksheet('Sheet' + i)
  }
  return workbook
}

ExcelUtil.prototype.setDataRowStyle = function (worksheet, rowData) {
  for (var i = 0; i < rowData.length; i++) {
    var row = worksheet.getRow(i + 2);
    row.height = 15;
    row.font = {
      name: 'Microsoft YaHei UI',
      color: {
        argb: 'FF000000'
      },
      size: 9
    };
  }
  worksheet.eachRow(function(row, rowNumber) {
    row.eachCell({
      includeEmpty: true
    }, function (cell) {
      if(rowNumber != 1) {
        cell.border = {
          top: {style:'thin'},
          left: {style:'thin'},
          bottom: {style:'thin'},
          right: {style:'thin'}
        };
        cell.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
      }
    });
  });
}

ExcelUtil.prototype.setFristRowStyle = (worksheet) => {
  let head = worksheet.getRow(1);
  head.height = 28;
  head.font = {
    name: 'Microsoft YaHei UI',
    color: {
      argb: 'FF000000'
    },
    family: 2,
    size: 9,
    bold: true
  };
  head.alignment = {
    vertical: 'middle',
    horizontal: 'center'
  };
  head.eachCell((cell) => {
    cell.border = {
      top: {style:'thin'},
      left: {style:'thin'},
      bottom: {style:'thin'},
      right: {style:'thin'}
    };
  });
}

module.exports = new ExcelUtil()