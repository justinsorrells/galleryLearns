const modules = require('../model/modules');
const { body, validationResult } = require('express-validator');
const marked = require('marked');
const async = require('async');
const comment = require('../model/comments');
const user = require('../model/user');
const session = require('express-session');

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
    async.parallel(
        {
            module(callback) {
                modules.findById({ _id: req.params.id }).exec(callback);
            },
            comments(callback) {
                comment.find({ post: req.params.id }).populate('user').exec(callback);
            }
        },

        (err, result) => {
            if (err) {
                return next(err);
            }

            if (!result) {
                res.render('index', {
                    title: "Unable to access post",
                })
            }
            res.render('post', {
                result: result.module,
                title: result.module.title,
                postContent: marked.parse(result.module.content),
                comments: result.comments,
            })
        }
    )
}

exports.comment_post = [

    body("newComment")
        .trim()
        .escape()
        .isLength({ min: 1 })
        .withMessage("Please enter a comment"),

    (req, res, next) => {

        const errors = validationResult(req);
        console.log(`New Comment: ${req.body.newComment}`)
        if (!errors.isEmpty()) {
            req.session.errors = errors.array();
            res.redirect('/posts/' + req.params.id + "?e=" + encodeURIComponent("Cannot leave a blank comment"));
            return;
        }

        async.parallel(
            {
                post(callback) {
                    modules.findById({ _id: req.params.id }).exec(callback);
                },
                profile(callback) {
                    user.findOne({ cookie: req.session.id }).exec(callback);
                }
            },
            (err, result) => {
                if (err) {
                    return next(err);
                }

                if (!result) {
                    res.redirect("error", {
                        message: "Error retrieving info from database",
                    })
                    return;
                }
                if (result.post._id && result.profile._id) {
                    const userComment = new comment({
                    post: result.post._id,
                    user: result.profile._id, 
                    comment: req.body.newComment,
                    })
                    userComment.save((err) => {
                        if (err) {
                            return next(err);
                        }
                        res.redirect('/posts/' + result.post._id);
                        return;
                    })
                } else {
                    res.redirect('/');
                }
            }
        )
    }
]


// exports.comment_post = function(req, res, next) {
//     async.parallel(
//         {
//             post(callback) {
//                 modules.findById({ _id: req.params.id }).exec(callback);
//             },
//             profile(callback) {
//                 user.findOne({ cookie: req.session.id }).exec(callback);
//             }
//         },
//         (err, result) => {
//             if (err) {
//                 return next(err);
//             }

//             if (!result) {
//                 res.redirect("error", {
//                     message: "Error retrieving info from database",
//                 })
//                 return;
//             }
//             if (result.post._id && result.profile._id) {
//                 const userComment = new comment({
//                     post: result.post._id,
//                     user: result.profile._id, 
//                     comment: req.body.newComment,
//                 })
//                 userComment.save((err) => {
//                     if (err) {
//                         return next(err);
//                     }
//                     res.redirect('/posts/' + result.post._id);
//                     return;
//                 })
//             } else {
//                 res.redirect('/');
//             }
//         }
//     )
// }