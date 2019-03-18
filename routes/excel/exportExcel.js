var express = require('express');
var router = express.Router();
var bugService = require('../../service/export/BugService')
var rtcBugService = require('../../service/export/RtcBugService')
var rtcBacklogService = require('../../service/export/RtcBacklogService')
var backlogService = require('../../service/export/BacklogService')
var rtcTaskService = require('../../service/export/RtcTaskService')

router.post('/export/bug', function (req, res, next) {
  var condition = req.body;
  bugService.getExcel('bugs', condition).then((workbook) => {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=bugFile.xlsx");
    workbook.xlsx.write(res).then(() => {
        res.end();
    }).catch((err) => {
      res.send(err)
    })
  })
});

router.post('/export/bug/rtc', function (req, res, next) {
  var condition = req.body;
  rtcBugService.getExcel('bugs', condition).then((workbook) => {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=bugFile.xlsx");
    workbook.xlsx.write(res).then(() => {
        res.end();
    }).catch((err) => {
      res.send(err)
    })
  })
});

router.post('/export/task/rtc', function (req, res, next) {
  var condition = req.body;
  rtcTaskService.getExcel('backlogs', condition).then((workbook) => {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=bugBacklog.xlsx");
    workbook.xlsx.write(res).then(() => {
        res.end();
    }).catch((err) => {
      res.send(err)
    })
  })
});

router.post('/export/backlog/rtc', function (req, res, next) {
  var condition = req.body;
  rtcBacklogService.getExcel('backlogs', condition).then((workbook) => {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=backlog.xlsx");
    workbook.xlsx.write(res).then(() => {
        res.end();
    }).catch((err) => {
      res.send(err)
    })
  })
});

router.post('/export/backlog', function (req, res, next) {
  var condition = req.body;
  backlogService.getExcel('backlogs', condition).then((workbook) => {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=backlog.xlsx");
    workbook.xlsx.write(res).then(() => {
        res.end();
    }).catch((err) => {
      res.send(err)
    })
  })
});

module.exports = router;