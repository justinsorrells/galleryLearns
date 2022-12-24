const mongoose = require('mongoose');
const User = require('../model/user');
const session = require('express-session');
const async = require('async');

module.exports = function checkAdmin(req, res, next) {
    async.series({
            user (callback) {
                User.findOne({ cookie: req.session.id }).exec(callback);
            },
        },
        (err, result) => {
            if (err) {
                return next(err);
            }

            if (!result.user) {
                return next(err);
            }
            if (result.user.privileges) {
                if (result.user.privileges == 'admin') {
                    res.locals.privileges = 'admin';
                }
            }
            return next();
    })
}