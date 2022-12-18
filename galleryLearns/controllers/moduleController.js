const moduleModel = require('../model/modules');
const mongoose = require('mongoose');

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