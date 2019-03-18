var express = require('express');
var router = express.Router();
var deployCheck = require('../../service/schedule/DeployCheck')

router.post('/deployCheck', function (req, res, next) {
  let param = req.body
  deployCheck.excute(param)
  res.json(1)
});

module.exports = router;