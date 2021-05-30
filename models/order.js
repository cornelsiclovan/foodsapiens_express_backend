const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    wp_id : {
        type: Number
    },
    name: {
        type: String
    },
    address1: 
    {
        type: String
    },
    address2: {
        type: String
    },
    city: {
        type: String
    },
    items: [{
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
        ]
    }],
    date_created: {
        type: Date
    },
    date_modified: {
        type: Date
    }
});

module.exports = mongoose.model('Order', orderSchema);