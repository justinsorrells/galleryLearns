const express = require('express');
const router = express.Router();
const session = require('express-session');


router.get('/', function(req, res, next) {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;