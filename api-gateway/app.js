/*
============================================
; Title: API Gateway
; Author: Troy Martin
; Date: 06/29/2019
; Modified By: Troy Martin
; Description: Express based API Gateway
;===========================================
*/
// start program

// variable declaration and assignment

// Declare variables and import modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// setup the mongodb connection
mongoose.connect('mongodb+srv://admin:admin@buwebdev-cluster-1-opi0o.mongodb.net/api-gateway?retryWrites=true', {
  promiseLibrary: require('bluebird')
})
.then (() => console.log('connection successful'))
.catch( (err) => console.error(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// export the application
module.exports = app;

// end program
