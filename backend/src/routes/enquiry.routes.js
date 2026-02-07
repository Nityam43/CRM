const express = require('express');
const { createEnquiry, getEnquiries, getEnquiryById, updateEnquiry, cancelEnquiry, getEnquiriesByStatus, deleteEnquiry, getDeletedEnquiries, restoreEnquiry, permanentDeleteEnquiry, restoreCancelledEnquiry } = require('../controllers/enquiry.controller.js');
const router = express.Router();

router.post('/add', createEnquiry);
router.get('/', getEnquiries);
router.get('/status/:status', getEnquiriesByStatus);
router.get('/:id', getEnquiryById);
router.put('/:id', updateEnquiry);
router.put('/cancel/:id', cancelEnquiry);
router.delete('/:id', deleteEnquiry);
router.get('/deleted/all', getDeletedEnquiries);
router.put('/restore/:id', restoreEnquiry);
router.patch('/restore-cancelled/:id', restoreCancelledEnquiry);
router.delete('/force/:id', permanentDeleteEnquiry);

module.exports = router;
