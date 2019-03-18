var express = require('express');
var router = express.Router();
var Mongodb = require('../../database/mongodb');

//数据分组查询.


/**
 * 提单数量
 */
router.post('/sumBugCreate', function (req, res, next) {
  var tbName = 'bugs';
  let condition = req.body;
  let model = Mongodb.getConnection(tbName);
  let groupConditions = [
    { $project:{ 'createTime': 1, 'commitUser':1, '_id':0 } },
    { $match: { 'createTime': { $gte: new Date(condition.sDate), $lte: new Date(condition.eDate) } } },
    { $group: { _id: '$commitUser', value: { $sum: 1 } } },
    { $sort: { value: 1 } }
  ]
  model.aggregate(groupConditions, function(err, docs){
    if(!err){
      res.json(docs);
    } else {
      console.log(err)
    }
  });
});

/**
 * 缺陷平均验证时间
 */
router.post('/avgVertifyTime', function (req, res, next) {
  var tbName = 'bugs';
  let condition = req.body;
  let model = Mongodb.getConnection(tbName);
  let groupConditions = [
    { $project: { 'createTime': 1, 'orbits': 1, 'commitUser': 1, '_id': 0, 'state': 5 } },
    { $unwind: '$orbits' },
    { $match: { 'state': 5, 'orbits.state': 2, 'createTime': { $gte: new Date(condition.sDate), $lte: new Date(condition.eDate) } } },
    { $group: { _id: '$commitUser', value: { $avg: '$orbits.stayTime' } } },
    { $sort: { value: 1 } }
  ]
  model.aggregate(groupConditions, function(err, docs){
    if(!err){
      res.json(docs);
    } else {
      console.log(err)
    }
  });
});

/**
 * 完成任务合计
 */
router.post('/sumTaskDone', function (req, res, next) {
  var tbName = 'backlogs';
  let condition = req.body;
  let model = Mongodb.getConnection(tbName);
  let groupConditions = [
    { $project:{ '_id':0, 'tasks':1,'state':1 } },
    { $unwind: '$tasks' },
    { $match: {'state':2, 'tasks.endDate': {$gte: condition.sDate, $lte: condition.eDate}} },
    { $group: { _id: '$tasks.userId', value: {$sum: '$tasks.estimate'}} },
    { $sort: { value: 1 } }
  ]
  model.aggregate(groupConditions, function(err, docs){
    if(!err){
      res.json(docs);
    } else {
      console.log(err);
    }
  });
});

/**
 * 开发平均缺陷处理时间
 */
router.post('/avgBugProcessTime', function (req, res, next) {
  var tbName = 'bugs';
  let condition = req.body;
  let model = Mongodb.getConnection(tbName);
  let groupConditions = [
    { $project: { 'createTime': 1, 'orbits': 1, 'commitUser': 1, '_id': 0, 'state': 5 } },
    { $unwind: '$orbits' },
    { $match: { 'state': 5, 'orbits.state': 3, 'createTime': { $gte: new Date(condition.sDate), $lte: new Date(condition.eDate) } } },
    { $group: { _id: '$orbits.toUserId', value: { $avg: '$orbits.stayTime' } } },
    { $sort: { value: 1 } }
  ]
  model.aggregate(groupConditions, function(err, docs){
    if(!err){
      res.json(docs);
    } else {
      console.log(err);
    }
  });
});

/**
 * 缺陷处理数量
 */
router.post('/sumBugProcess', function (req, res, next) {
  var tbName = 'bugs';
  let condition = req.body;
  let model = Mongodb.getConnection(tbName);
  let groupConditions = [
    { $project: { 'id': 1, 'createTime': 1, 'orbits': 1, 'commitUser': 1, '_id': 0, 'state': 5 } },
    { $unwind: '$orbits' },
    { $match: { 'state': 5, 'orbits.state': 3, 'createTime': { $gte: new Date(condition.sDate), $lte: new Date(condition.eDate) } } },
    { $group: { _id: '$orbits.toUserId', value: { $sum: 1 } } },
    { $sort: { value: 1 } }
  ]
  model.aggregate(groupConditions, function(err, docs){
    if(!err){
      res.json(docs);
    } else {
      console.log(err)
    }
  });
});

module.exports = router;