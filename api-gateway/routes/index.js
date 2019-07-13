/*
============================================
; Title: Assignment 2.3
; Author: Troy Martin
; Date: 06/27/2019
; Modified By: Troy Martin
; Description: Express based API Gateway
;===========================================
*/
// start program

// Declare the express variable and import the express module
var express = require('express');
// Declare and create an instance of the express router
var router = express.Router();

// Use the router get method to set the home route
router.get('/', function(req, res, next) {
  // Use the render method on the response to display the index.ejs
  res.render('index', { title: 'Express' });
});

// Export the router
module.exports = router;

// end program
