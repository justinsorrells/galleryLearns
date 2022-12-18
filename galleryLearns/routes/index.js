var express = require('express');
var router = express.Router();
const indexRouter = require('../controllers/indexController');
/* GET home page. */

router.get('/', indexRouter.index_get);

router.get('/posts/:id', indexRouter.index_post_get);

module.exports = router;
