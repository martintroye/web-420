/*
============================================
; Title: Assignment 8.4
; Author: Troy Martin
; Date: 08/18/2019
; Modified By: Troy Martin
; Description: API Gateway Part V
;===========================================
*/
// start program

// variable declaration and assignment
// Declare the jwt variable and import jsonwebtoken
var jwt = require('jsonwebtoken');
// Declare the config variable and import config
var config = require('./config');


// function declaration

/*
; Params: req: Request, res: Response, next
; Response: none
; Description: Does x-access-token header exist, is it a valid JSON token
*/
function checkToken(req, res, next){
  // get the value of the x-access-token header
  var token = req.headers['x-access-token'];
  // if the x-access-token does not exist return 403 Forbidden with message
  if(!token){
    return res.status(403).send({auth: false, message: "No token provided."});
  }

  // verify the value of the JSOn token
  jwt.verify(token, config.web.secret, function(err, decoded){
    // if there is an error decoding the token return a 500 server error with a message
    if(err){
      return res.status(500).send({auth: false, message: "Failed to authenticate token."});
    }
    // get the id of the user and set the request userId
    req.userId = decoded.id;
    // continue to the next piece of middleware
    next();
  });

}

// export the checkToken function
module.exports = checkToken;

// end program
