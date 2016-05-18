'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');//主要功能是：在控制台中，显示req请求的信息。
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');//bodyParser用于解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理.
var http = require('http');

var routes = require('./routes/index');
var users = require('./routes/users');
var angulars = require('./routes/angular');

var app = express();
app.set('port',3000);
http.createServer(app).listen(3000,function(){
  console.log('Server listening on port ' + app.get('port'));
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use('/', routes);
app.use('/users', users);
app.use('/angulars',angulars);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;


