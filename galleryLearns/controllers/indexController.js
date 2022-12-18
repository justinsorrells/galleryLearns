const modules = require('../model/modules');
const { body, validationResult } = require('express-validator');
const marked = require('marked');
const async = require('async');

exports.index_get = function(req, res, next) {
    modules.find({}, (err, result) => {
        if (err) {
            return next(err);
        }

        if (!result) {
            res.render('index', {
                title: "Error unable to render home page",
            })
            return;
        }
        res.render('index', {
            title: "Home",
            result: result,
        });
    })
}

exports.index_post_get = function(req, res, next) {
    console.log(req.params.id);
    modules.findById({ _id: req.params.id }).exec((err, result) => {
        if (err) {
            return next(err);
        }

        if (!result) {
            res.render('index', {
                title: "Unable to access post :(",
            });
            return;
        }

        console.log(marked.parse(result.content));
        res.render('post', {
            result: result,
            title: result.title,
            postContent: marked.parse(result.content)
        })
    })
}