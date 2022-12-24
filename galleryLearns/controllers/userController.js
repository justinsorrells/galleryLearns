const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require('../model/user');
const async = require('async');

/* GET users listing. */
// Render accout creation page when an HTTP GET request is made 
exports.create_user_get = function (req, res, next) {
  res.render('create_user', {
    title: 'Create Account',
  });
}

// Process the form submission when an HTTP POST request is made
exports.create_user_post = [
  // Validate and sanitize Data
  body("email")
    .trim()
    .escape()
    .isEmail()
    .toLowerCase()
    .isLength({ min: 1 })
    .withMessage("Must include email"),
  body("username")
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric characters only")
    .isLength({ min: 1 })
    .withMessage("Must include username")
    .trim()
    .escape(),
  body("password")
    .escape()
    .isLength({ min: 8 })
    .withMessage("Password must be a minimum of 8 characters"),

  // Process data
  (req, res, next) => {

    // Create a new user document using the User model
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });  

    // Create an errors object from the Form Validation Results
    const errors = validationResult(req);
    // If there are errors then render the page again and display the errors
    if (!errors.isEmpty()) {
      res.render('create_user', {
        title: 'Create Account',
        errors: errors.array(),
      });
      return;
    }

    // Utilize bcrypt to encrypt the user's password then store it using mongoose
    bcrypt.hash(user.password, 10, function(err, hash) {
      if (err) {
        res.render('create_user', {
          title: 'Create Account',
          errors: [{"msg": "Error unable to save password. Please try again"}],
        });
        return;
      }
      user.password = hash;
      
      // Call for username and email separately 
      async.parallel(
        {
          user(callback) {
            User.findOne({ username: req.body.username }).exec(callback)
          },
          email(callback) {
            User.findOne({ email: req.body.email }).exec(callback)
          },
        },
        (err, results) => {
          if (err) { 
            return next(err);
          }
          // Check to see if the username or email already exist
          if (results.user) {
            res.render('create_user', {
              title: 'Create Account',
              errors: [{"msg": "User already exists"}],
            });
            return
          }
          if (results.email) {
            res.render('create_user', {
              title: 'Create Account',
              errors: [{"msg": "Email already exists"}],
            });
            return
          }
          // If all of the information is valid then create the new account
          // Store it in MongoDB
          user.save((err) => {
            if (err) {
              return next(err);
            }
            res.redirect("/login");
          })
        }
      )
    });
  }
];
