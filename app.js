var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = require('./routes/router');
var mongoose = require('mongoose');

var app = express();

// 自定义token
logger.token('from', function(req, res){
  if(req.cookies && req.cookies['user']){
    return `${new Date()}-${req.cookies['user'].email}`;
  } else {
    return "-";
  }
  
});
// 自定义format，其中包含自定义的token
logger.format('joke', '[:from] :method :url :status');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('joke'));
app.use(bodyParser.json({ "limit": "10000kb"}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

// use session
app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// mongodb config

// init router
app.use(function (req, res, next) {    
  if(router.routeRule(req)) {
    next();
  } else {
    console.log(401)
    res.sendStatus(401);
  }
});

router.initRoutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.send({'code': 1, 'message': err.message})
});

module.exports = app;
