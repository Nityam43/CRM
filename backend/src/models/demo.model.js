const mongoose = require('mongoose');

const demoSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
    },
    firstMobile: {
        type: String,
    },
    secondMobile: {
        type: String,
    },
    course: {
        type: String,
    },
    reference: {
        type: String,
    },
    leadDate: {
        type: Date,
    },
    time: {
        type: String,
    },
    reminder: {
        type: Date,
    },
    note: {
        type: String,
    },
    status: {
        type: String,
        default: 'Demo',
        enum: ['Demo', 'Enrolled', 'Cancelled'],
    },
    // Fields from enquiry that might be useful
    email: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    birthDate: {
        type: Date,
    },
    education: {
        type: String,
    },
    counsellor: {
        type: String,
    },
    enquiryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enquiry',
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Demo = mongoose.model('Demo', demoSchema);

module.exports = Demo;
