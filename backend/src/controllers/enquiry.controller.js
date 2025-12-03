const Enquiry = require('../models/enquiry.model.js');

const createEnquiry = async (req, res) => {
    try {
        const enquiry = new Enquiry(req.body);
        await enquiry.save();
        res.status(201).json({
            message: 'Enquiry created successfully',
            data: enquiry,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating enquiry',
            error: error.message,
        });
    }
};

const getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find();
        res.status(200).json(enquiries);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching enquiries',
            error: error.message,
        });
    }
};

module.exports = {
    createEnquiry,
    getEnquiries,
};
