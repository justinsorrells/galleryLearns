const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

/* GET users listing. */
exports.create_user_get = function (req, res, next) {
  res.render('create_user', {
    title: 'Create Account',
  });
}

exports.create_user_post = function (req, res, next) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        console.log(hash);
    })
  })
  res.redirect('http://127.0.0.1:8000/users/create');
}
