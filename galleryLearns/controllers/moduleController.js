const moduleModel = require('../model/modules');
const mongoose = require('mongoose');
const async = require('async');

exports.module_create_get = function(req, res, next) {
    res.render('create_module', {
        title: "Create Module"
    });
}

exports.module_create_post = function(req, res, next) {
    const post = new moduleModel({
        title: req.body.title,
        author: "Justin Sorrells",
        date: Date.now(),
        category: [req.body.category],
        summary: req.body.summary,
        headerImg: req.body.headerImg,
        content: req.body.content,
    })

    console.log(post);

    post.save((err) => {
        if (err) {
            return next(err);
        }

        res.redirect('/module/create');
    })
} 

exports.module_edit_get = function(req, res, next) {
    async.series({
        module(callback) {
            moduleModel.findOne({ _id: req.params.id }).exec(callback);
        }
    },
    (err, result) => {
        if (err) {
            return next(err);
        }

        if (!result) {
            return next(err);
        }

        res.render('create_module', {
            title: "Edit",
            result: result.module,
        })
    })
}

exports.module_edit_post = function(req, res, next) {
    async.series({
        module(callback) {
            moduleModel.findOne({ _id: req.params.id }).exec(callback);
        }
    },
    (err, result) => {
        if (err) {
            return next(err);
        }

        if (!result) {
            return next(err);
        }
        let post = result.module;
        post.overwrite({
            title: req.body.title,
            author: "Justin Sorrells",
            date: Date.now(),
            category: [req.body.category],
            summary: req.body.summary,
            headerImg: req.body.headerImg,
            content: req.body.content,
        })
        post.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/posts/' + req.params.id)
        })
    })
}