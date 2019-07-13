/*
============================================
; Title: Assignment 2.3
; Author: Troy Martin
; Date: 07/09/2019
; Modified By: Troy Martin
; Description: Express based API Gateway
;===========================================
*/
// start program
// Declare the User variable and import the user model
var User = require('../models/user');

/*
; Params: req: Request, res: Response
; Response: none
; Description: Register a new user on POST
*/
exports.user_register = function(req, res) {
  // Render a message to the response
  res.send('NOT IMPLEMENTED: User registration POST');
};

/*
; Params: req: Request, res: Response
; Response: none
; Description: Verify token on GET
*/
exports.user_token = function(req, res) {
  // Render the message to the response
  res.send('NOT IMPLEMENTED: User token lookup GET');
};


// end program
