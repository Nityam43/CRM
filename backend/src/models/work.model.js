const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  workName: {
    type: String,
    required: [true, 'Work name is required'],
    trim: true
  },
  personName: {
    type: String,
    required: [true, 'Person name is required'],
    trim: true
  },
  reminderDate: {
    type: Date,
    required: [true, 'Reminder date is required']
  },
  details: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Completed", "Cancelled"]
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Work', workSchema);
