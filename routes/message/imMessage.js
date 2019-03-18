let CryptoJS = require("crypto-js");
const http = require('http');

const host = '**.***.cn';
const port = 80;
const secretId = '0015f2e10f8b46cf8265f0122e9dba22';
const key = CryptoJS.enc.Utf8.parse('6e7e4f774d4d417aa827d482c56241d5');

module.exports = {
  /**
   * 发送IM消息
   * @param {*接受消息人邮箱} toUserEmails 
   * @param {*内容} content 
   * @param {*0文字13html} type 
   * @param {*题目（PC无效）} title 
   * @param {*发送成功回调} callback 
   */
  send(toUserEmails, content, type, title, callback) {
    let encryptToUserEmails = CryptoJS.DES.encrypt(toUserEmails, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
    encryptToUserEmails = encodeURIComponent(encryptToUserEmails);
    let path = '/webapp/restful/conversation/sendMessageByAIUser';
    let post_data = `secretId=${secretId}&toUserEmails=${encryptToUserEmails}&content=${content}&type=${type}&title=${title}`;

    let post_options = {
      host,
      port,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    };

    let post_req = http.request(post_options, (res) => {
      res.setEncoding('utf-8');
      let chunks = [];
      res.on('data', (chunk) => {
        chunks.push(chunk);
      });
      res.on('end', () => {
        let chunk = chunks.join();
        try {
          if (chunk.startsWith('{') && chunk.endsWith('}')) {
            chunk = JSON.parse(chunk);
          }
        } catch (e) {
          console.log(e);
          chunk = chunks.join();
        }
        callback(chunk)
      });
    });

    post_req.write(post_data);
    post_req.end();
  }
};