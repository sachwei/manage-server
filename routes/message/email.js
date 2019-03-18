/**
 * 邮件发送
 * 调用方法:sendMail('amor@qq.com','这是测试邮件', 'Hi,这是一封测试邮件')
 */

var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('./config')

let Email = function () {

}

/**
 * 
 * @param {Object} mailObj 邮件信息对象
 * @param {function} callback 回调函数
 */
Email.prototype.sendMail = function (mailObj, callback) {
    // var formEmail = config.email.name + '<' + config.email.user + '>';
    var user = mailObj.fromEmail;
    if(user.indexOf('<') !== -1 && user.indexOf('>') !== -1){
        user = user.substring(user.indexOf('<') + 1, user.indexOf('>'));
    }
    var transport = nodemailer.createTransport(smtpTransport({
        host: config.email.host,
        auth: {
            user: user,
            pass: mailObj.fEmailPassword
        }
    }));
    transport.sendMail({
        // from: formEmail,
        from: mailObj.fromEmail,//发送人邮箱
        to: mailObj.toEmail,//收件人邮箱
        cc: mailObj.ccEmail,//抄送人邮箱
        subject: mailObj.subject,
        html: mailObj.content,
        attachments: [{
            filename: mailObj.fileName,
            path: mailObj.filePath
        }]
    }, callback);
}

module.exports = new Email();