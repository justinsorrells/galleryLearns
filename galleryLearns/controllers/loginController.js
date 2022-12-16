const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require('../model/user');
const async = require('async');
const sessions = require('express-session');

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
                res.render('index', {
                    title: "Congrats on the login!",
                })
            }
        });
    })
};