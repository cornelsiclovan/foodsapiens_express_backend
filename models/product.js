const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    denumire_meniu: {
        type: String
    },
    tip: {
        type: String
    },
    day: {
        type: Number
    }, 
    nume: {
        type: String
    }
});

module.exports = mongoose.model('Product', productSchema);