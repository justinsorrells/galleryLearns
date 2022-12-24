const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');

router.get('/create', moduleController.module_create_get);
router.post('/create', moduleController.module_create_post);

router.get('/edit/:id', moduleController.module_edit_get);
router.post('/edit/:id', moduleController.module_edit_post);

module.exports = router;