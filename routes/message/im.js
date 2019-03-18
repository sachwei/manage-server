/**
 * 发送消息.
 */
let im = require('./imMessage');

let IM = function(){

}

IM.prototype.remindMess = function(toEmail, content, callback){
    im.send(toEmail, content, 0, 'x', (data) => {
        callback(data);
    })
}

IM.prototype.remindUrl = function(toEmail, content, callback){
    im.send(toEmail, content, 13, 'x', (data) => {
        callback(data);
    })
}

module.exports = new IM();
