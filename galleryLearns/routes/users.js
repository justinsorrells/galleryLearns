var express = require('express');
var router = express.Router();
const user = require("../controllers/userController");

/* GET users listing. */
router.get('/create', user.create_user_get);

router.post('/create', user.create_user_post);

module.exports = router;
