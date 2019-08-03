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
// Declare the jwt variable and import jsonwebtoken module
var jwt = require('jsonwebtoken');
// Declare the bcrypt variable and import bcryptjs module
var bcrypt = require('bcryptjs');
// Declare the config variable and import the config model
var config = require('../config');


/*
; Params: req: Request, res: Response
; Response: 500 error, 200 ok
; Description: Register a new user on POST
*/
exports.user_register = function(req, res) {
  // Using the bcrypt hashSync method hash the password for the new user
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  // Declare the newUser and set the object to the values from the request
  var newUser = new User({
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email
  });

  // Add the user document to the collection
  User.add(newUser, (err, user) => {
    // If there was an error handle it
    if(err){
      // Return a server error, 500 and a message to the user.
      return res.status(500).send('There was a problem registering the user.');
    }

    // Using the jwt sign method generate the auth token
    var token = jwt.sign({id: user._id}, config.web.secret, {
      expiresIn: 86400 // 24 hours
    });

    // Render a message to the response
    res.status(200).send({auth: true, token: token});
  });
};

/*
; Params: req: Request, res: Response
; Response: 401 unauthorized, 500 error, 404 not found, 200 ok
; Description: Verify token on GET
*/
exports.user_token = function(req, res) {
  // Declare the token variable and retrieve the token from the headers of the request
  var token = req.headers['x-access-token'];

  if(!token){
    return res.status(401).send({auth: false, message: 'No token provided.'});
  }

  jwt.verify(token, config.web.secret, function(err, decoded){
      // if there is an error return a 500, server error with a message
    if(err){
      return res.status(500).send('Failed to authenticate token.');
    }

    // Call the getById method on the mongoose model
    User.getById(decoded.id, function(err, user){
      // if there is an error return a 500, server error with a message
      if(err){
        return res.status(500).send('There was a problem finding the user.')
      }

      // if the user is not defined return a 404 status code
      if(!user){
        return res.status(404).send('No user found.');
      }

      // Return the 200 status code, OK and the user
      res.status(200).send(user);

    });
  });
};


/*
; Params: req: Request, res: Response
; Response: 500 error, 404 not found, 401 unauthorized, 200 OK
; Description: Validate user exists, compare password and return token
*/
exports.user_login = function(req, res){

  // Call the getOne method of the model passing the email to match the user and callback function to handle the query response
  User.getOne(req.body.username, function(err, user){
    // Return 500 status code on error
    if(err) return res.status(500).send("Error on server");
    // Return 404 if user matching email not found
    if(!user) return res.status(404).send("No user found.");

    // Compare the provided password against the user value
    var passwordIsValid = bcrypt.compare(req.body.password, user.password);
    // if the passwords do not match return a 401, unauthorized
    if(!passwordIsValid) return res.status(401).send({auth: false, token: null});

    // Generate a token from the users id
    var token = jwt.sign({id: user._id}, config.web.secret, {expiresIn: 86400});
    // Return OK and token for the user
    res.status(200).send({auth: true, token: token});

  });
};

/*
; Params: req: Request, res: Response
; Response: 200 OK
; Description: Log out the user
*/
exports.user_logout = function(req, res){
  // Return 200 ok, and unauthorized response
  res.status(200).send({auth: false, token: null});
};


// end program
