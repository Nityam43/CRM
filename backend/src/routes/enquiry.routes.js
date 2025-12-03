const express = require('express');
const { createEnquiry } = require('../controllers/enquiry.controller.js');
const router = express.Router();

router.post('/add', createEnquiry);

module.exports = router;


