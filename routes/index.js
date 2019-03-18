var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/work', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/work', 'index.html'));
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/work');
});

// update

module.exports = router;
