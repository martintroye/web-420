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

// Declare the mongoose variable and import the mongoose module
var mongoose = require("mongoose");
// Declare the schema
const Schema = mongoose.Schema;

// Define the employee schema with a first and last name
let userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true}
});

// Export the User model set to the user schema
module.exports = mongoose.model('User', userSchema);

// end program
