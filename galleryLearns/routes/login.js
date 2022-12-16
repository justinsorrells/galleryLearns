const express = require('express');
const router = express.Router();
const login = require('../controllers/loginController');

router.get('/', login.login_get);

router.post('/', login.login_post);

module.exports = router;