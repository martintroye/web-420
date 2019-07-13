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

// Declare the createError variable and import the http-errors module
var createError = require('http-errors');
// Declare the express variable and import the express module
var express = require('express');
// Declare the path variable and import the path module
var path = require('path');
// Declare the cookieParser variable and import the cookieParser module
var cookieParser = require('cookie-parser');
// Declare the logger variable and import the morgan module
var logger = require('morgan');
// Declare the mongoose variable and import the mongoose module
var mongoose = require('mongoose');
// Set the mongoose Promise to the imported bluebird module
mongoose.Promise = require('bluebird');
// Declare the indexRouter variable and import the index module
var indexRouter = require('./routes/index');
// Declare the apiCatalog variable and import the api-Catalog module
var apiCatalog = require("./routes/api-catalog");

// setup the mongodb connection
mongoose.connect('mongodb+srv://admin:admin@buwebdev-cluster-1-opi0o.mongodb.net/api-gateway?retryWrites=true', {
  // Set the promise library to an import of the bluebird module
  promiseLibrary: require('bluebird')
})
// After the connection is made write out a message to console
.then (() => console.log('connection successful'))
// If there is an error write it out to the console
.catch( (err) => console.error(err));

// Declare the app variable and create an instance of express
var app = express();

// Call the Express set function to tell Express the views are in the 'views' directory
app.set('views', path.join(__dirname, 'views'));
// Call the Express set function to set the view engine to EJS
app.set('view engine', 'ejs');
// Call the Express use function to setup the logger using the dev format
app.use(logger('dev'));
// Call the Express use function to setup the JSON parsing middleware
app.use(express.json());
// Call the Express use function to apply the body-parser middleware
app.use(express.urlencoded({ extended: false }));
// Call the Express use function to apply the cookie-parser middleware
app.use(cookieParser());
// Call the Express use function to setup static resource use
app.use(express.static(path.join(__dirname, 'public')));
// Call the Express use function to apply the router to the home path
app.use('/', indexRouter);
// Call the Express use function to apply the router to the api path
app.use('/api', apiCatalog);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // Call the createError function and send status code 404, not found
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // handle the error based on the environment
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Set the status code, if not defined return a 500, server error
  res.status(err.status || 500);
  // Call the render method on the response to display the error page
  res.render('error');
});

// export the application
module.exports = app;

// end program
