/*
============================================
; Title: Assignment 2.3
; Author: Troy Martin
; Date: 06/29/2019
; Modified By: Troy Martin
; Description: Express based API Gateway
;===========================================
*/
// start program

// Declare the config variable and set it to a default object
var config = {};
// Declare the config.web variable and set it to a default object
config.web = {};
// Declare the config.web.port variable and set it to a the process port or default it to 3000
config.web.port = process.env.PORT || '3000';
// Declare the config.web.secret variable and set it to a default value, note should be pulled from environment
config.web.secret = "!amAcl3arT3xtSecr3t";

// Export the config
module.exports = config;

// end program
