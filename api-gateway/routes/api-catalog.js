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

// Declare the express variable and import the express module
var express = require('express');
// Declare the router variable set to an instance of the express router
var router = express.Router();
// Declare the auth_controller variable and import the authController module
var auth_controller = require('../controllers/authController');

// Use the router post method to set the auth/register route
router.post('/auth/register', auth_controller.user_register);

// Use the router get method to set the auth/token route
router.get('/auth/token', auth_controller.user_token);

// Use the router post method to set the auth/login route
router.post('/auth/login', auth_controller.user_login);

// Use the router post method to set the auth/logout route
router.get('/auth/logout', auth_controller.user_logout);

// Export the router
module.exports = router;

// end program
