const mongoose = require('mongoose');

const listItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["Reference", "Area", "Hobbies", "Interest", "Counsellor"],
    },
}, { timestamps: true });

const ListItem = mongoose.model('ListItem', listItemSchema);

module.exports = ListItem;
