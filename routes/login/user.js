var express = require('express');
var router = express.Router();
var smartUtil = require('./ccServer');
var MongoDB = require('../../database/mongodb');

router.post('/login', function(req, res, next) {
  ewLogin(req, res).then((data) => {
    res.cookie("user", data, { maxAge: 1000 * 60 * 60 * 24 });
    res.json(data);
  }).catch(() => {
    ccLogin(req).then((data) => {
      let user = data;
      user.password = decodeURIComponent(getParamter(req, 'password'));
      saveOrUpdateUser(user).then((data) => {
        res.cookie("user", data, { maxAge: 1000 * 60 * 60 * 24 });
        res.json(data);
      }).catch((err) => {
        console.log(err)
        next('登陆失败');
      });
    }).catch((err) => {
      next(err);
    });
  })
});

router.get('/logout', function(req, res, next){
  res.clearCookie("user");
  res.send(200);
});

router.get('/ping', (req, res) => {
  res.status(200).send("pong!");
});

/**
 * 当前系统登录.
 */
function ewLogin(req, res){
  console.log('ewlogin');
  let userName = decodeURIComponent(getParamter(req, 'userName'));
  let password = decodeURIComponent(getParamter(req, 'password'));
  let conditions = {
    email: userName
  }
  return new Promise((resolve, reject) => {
    MongoDB.findOne('users', conditions, (err, docs) => {
      if(!err && docs){
        if(docs.password === password){
          resolve(docs);
        } else {
          reject();
        }
      } else {
        reject();
      }
    });
  });
}

function ccLogin(req){
  console.log('cclogin');
  return new Promise((resolve, reject) => {
    smartUtil.getHttp.post('/login', req.body['key']).then((res) => {
      if (res.data.errorCode === 0) {      
        resolve(res.data);
      } else {
        reject(new Error(res.data.errorMessage))
      }
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  });
}

/**
 * 保存用户
 */
function saveOrUpdateUser(user) {
  let condition = {
    email: user.email
  }

  let data = {
    userName: user.userName,
    password: user.password,
    email: user.email,
    mobile: user.mobile,
    sex: user.sex
  }
  
  return new Promise((resolve, reject) => {
    MongoDB.updateData('users', condition, data, (err, docs) => {
      if(!err){
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

function getParamter(req, key){
  let result = "";
  let params = req.body['key'];
  let paramArr = params.split('&');  
  for(let i = 0; i < paramArr.length; i++){
    if(paramArr[i].indexOf(key) != -1){
      result = paramArr[i].substr(paramArr[i].indexOf('=') + 1);
    }
  }
  return result;
}

module.exports = router;
