const express = require('express');
const router = express.Router();
const demoController = require('../controllers/demo.controller');

router.post('/demo', demoController.addDemo);
router.get('/demo', demoController.getDemos);

module.exports = router;
