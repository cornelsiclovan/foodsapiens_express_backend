const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    occurence: {
        type: Number
    },
    occurrenceArray: [
        Number
    ],
    wp_id: {
        type: String
    },
    name: {
        type: String
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    city: {
        type: String
    }
});

module.exports = mongoose.model('Item', itemSchema);