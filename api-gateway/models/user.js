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
var model = mongoose.model('User', userSchema);
module.exports = model;

/*
; Params: user: Schema, callback: function
; Response: none
; Description: Save user model
*/
module.exports.add = (user, callback) => {
  // Call the save method of the mongoose model
  user.save(callback);
};

/*
; Params: id: string, callback: function
; Response: none
; Description: Call the findById method of the mongoose model
*/
module.exports.getById = (id, callback) =>{
  // define the query by mongo id
  var query = {_id: id};
  // Call the findById method and pass the query and callback function
  // Using model instead of User because User is not defined
  model.findById(query, callback);
}

/*
; Params: e: string, callback: function
; Response: none
; Description: Call the findOne method of the mongoose model
*/
module.exports.getOne = (e, callback) => {
  // define the query by username
  // instructions have username being passed from soapui not the email address
  query = { username: e };
  // Call the findOne method and pass the query and callback function
  // Using model instead of User because User is not defined
  model.findOne(query, callback);
}

// end program
