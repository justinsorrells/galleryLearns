const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require('../model/user');
const async = require('async');
const session = require('express-session');
const cookieParser = require('cookie-parser');

exports.login_get = function (req, res, next) {
    res.render('login', {
        title: "Login",
    });
}

exports.login_post = function(req, res, next) {
    User.findOne({ username: req.body.username }).exec((err, user) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            res.render('login', {
                title: "you failed", 
            })
            return;
        }
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if (err) {
                return next(err);
            }
            if (result) {
                console.log(req.session);
                req.session.views = 1;
                req.session.userid = user.username;
                console.log(req.session.cookie);
                console.log(req.session.id);
                res.render('index', {
                    title: "Congrats on the login!",
                })
            }
        });
    })
};