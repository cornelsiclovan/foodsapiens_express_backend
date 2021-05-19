const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
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
        occurences: {
            type: Number
        },
    }]
});

module.exports = mongoose.model('Order', orderSchema);