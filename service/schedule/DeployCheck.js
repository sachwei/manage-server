let ScheduleService = require('./ScheduleService');
var schedule = require("node-schedule");
let Mongodb = require('../../database/mongodb');
var request = require('request');
var IM = require('../../routes/message/im');

class DeployCheck extends ScheduleService {
  initRule () {
    // 20秒钟执行一次
    this.rule.second = [1,21,41];
  }

  runTask (params) {
    let that = this
    Mongodb.find('deployhistory', { state: 0 }, {}, {}, function(err, docs){
      if (docs && (docs.length > 0)) {
        docs.forEach(server => {          
          request(server.checkUrl, (error, response, body) => {
            if (!error && response.statusCode == 200) {
              Mongodb.update('deployhistory', { '_id': server._id }, { 'state': 1 }, () => {
                Mongodb.findOne('subscription', { 'type': 0 }, function(err, sub){
                  if (!err && sub) {
                    sendMessage(sub.userId, `${server.serverName}升级完成`)
                  }
                })
              })
            }
          })
        })
      } else {
        that.cancel()
      }
    })
  }
}

function sendMessage (emails, content) {
  for (let i = 0; i < emails.length; i++) {
    IM.remindMess(emails[i], content, () => {});
  }
}

module.exports = new DeployCheck()