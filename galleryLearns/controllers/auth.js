const session = require('express-session');
const User = require('../model/user');
const Sessions = require('../model/sessions');
const async = require('async');
const express = require('express');

// Export Auth Middleware
module.exports = function validateSession(req, res, next) {
    // If the request url is '/login' or '/users/create' account 
    // Allow the user to advance
    if (req.url === '/login' || req.url == '/users/create' || req.url == '/logout') {
        return next()
    }

    // If there isn't a session id then redirect the user to login
    if (!req.session.id) {
        res.redirect('/login');
        return next();
    }
    // Grab the session ID from the Client's cookie
    const sessionIDFromCookie = req.session.id;
    
    // Search the User and Sessions databases for the session
    async.parallel({
        user(callback) {
            User.findOne({ cookie: sessionIDFromCookie }).exec(callback);
        },
        userSession(callback) {
            Sessions.findOne({ _id: sessionIDFromCookie }).exec(callback);
        }
    },
    // Cast the errors and results into an async function
        (err, results) => {
            // If there is an error then return it
            if (err) {
                return next(err);
            }
            // If the session wasn't found in either database redirect the client to login
            if (!results.user || !results.userSession) {
                res.redirect('/login');
            }
            // If the session is valid in both databases then allow the user to advance
            else if (results.user.cookie === results.userSession._id) {
                return next();
            // If something else happened then make the user login again
            } else {
                res.redirect('/login');
            }
        }
    )
}

