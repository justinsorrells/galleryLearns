const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require('../model/user');
const async = require('async');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Render the login page when an HTTP GET request is made to the server
exports.login_get = function (req, res, next) {
    res.render('login', {
        title: "Login",
    });
}

// Process the login form when an HTTP POST request is made 
// To do add form validation to escape() user input
exports.login_post = function(req, res, next) {
    // Search the database for a user
    User.findOne({ username: req.body.username }).exec((err, user) => {
        // If there is an error with the query then return an error
        if (err) {
            return next(err);
        }
        // If the user doesn't exist then rerender the login page with the 'User does not exist' message
        if (!user) {
            res.render('login', {
                title: "User does not exist", 
            })
            return;
        }
        // Compare the encrypted password to the plain text password input utilizing the bcrypt library
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            // If there is an error then return it
            if (err) {
                return next(err);
            }
            // If the comparison was successful then store the session id with the user's information
            if (result) {
                user.cookie = req.session.id;
                // Save the new session to the database
                user.save((err) => {
                    if (err) {
                        return next(err);
                    }
                    res.render('index', {
                        title: "Congrats on the login!",
                    })
                    return;
                });
            }
        });
    })
};