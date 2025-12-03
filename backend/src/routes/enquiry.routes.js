const express = require('express');
const { createEnquiry, getEnquiries } = require('../controllers/enquiry.controller.js');
const router = express.Router();

router.post('/add', createEnquiry);
router.get('/', getEnquiries);

module.exports = router;
