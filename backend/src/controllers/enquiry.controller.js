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

module.exports = {
    createEnquiry,
};
