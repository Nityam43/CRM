const express = require('express');
const { createEnquiry, getEnquiries, getEnquiryById, updateEnquiry, cancelEnquiry, getEnquiriesByStatus, deleteEnquiry } = require('../controllers/enquiry.controller.js');
const router = express.Router();

router.post('/add', createEnquiry);
router.get('/', getEnquiries);
router.get('/status/:status', getEnquiriesByStatus);
router.get('/:id', getEnquiryById);
router.put('/:id', updateEnquiry);
router.put('/cancel/:id', cancelEnquiry);
router.delete('/:id', deleteEnquiry);

module.exports = router;
