const express = require('express');
const { createEnquiry, getEnquiries, getEnquiryById, updateEnquiry } = require('../controllers/enquiry.controller.js');
const router = express.Router();

router.post('/add', createEnquiry);
router.get('/', getEnquiries);
router.get('/:id', getEnquiryById);
router.put('/:id', updateEnquiry);

module.exports = router;
