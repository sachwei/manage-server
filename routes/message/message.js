var express = require('express');
var router = express.Router();
var IM = require('./im');
var Email = require('./email');

/**
 * 邮件提醒.
 */
router.post('/sendEmail', function(req, res, next) {
    let paramObj = req.body;
    Email.sendMail(paramObj, (err, res1) => {
        if (error) {
            res.json({status: 0, mess: error.message});
        } else {
            res.json({status: 1, data: res1});
        }
    });
});

/**
 * 给个人发送im消息.
 */
router.post('/sendMessage', function (req, res, next) {
    let paramObj = req.body;
    let result = [];
    IM.remindMess(paramObj.toEmail, paramObj.content, (data) => {
        data.email = paramObj.toEmail;
        result.push(data);
        res.json(result);
    });
});

/**
 * 给制定范围人员发送im消息.
 */
router.post('/sendMessages', function (req, res, next) {
    let emails = req.body.emails;
    let content = req.body.content;    
    for (let i = 0; i < emails.length; i++) {
        IM.remindMess(emails[i], content, (data) => {});
    }
    res.json(1);
});

/**
 * 发送页面.
 */
router.post('/remindUrl', function (req, res, next) {
    let paramObj = req.body;
    let result = [];
    IM.remindUrl(paramObj.toEmail, paramObj.url, (data) => {
        data.email = paramObj.toEmail;
        result.push(data);
    })
    res.json(result);
});

module.exports = router;