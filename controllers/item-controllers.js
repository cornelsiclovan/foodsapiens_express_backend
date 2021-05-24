const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-errors');
const Fawn = require('fawn');
const Item = require('../models/item');

//Fawn.init(mongoose);

const getItems = async (req, res, next) => {
    let items;
    try {
        items = await Item.find({});
    } catch(error) {
        return next(new HttpError("Fetching ordres failed, please try again later", 500));
    }

    console.log(req.query.today);

    //console.log(orders);
    // serializedOrders = orders.map(order => {
    //     return {
    //         _id: order._id,
    //         name: order.name,
    //         address1: order.address1,
    //         address2: order.address2,
    //         city: order.city,
    //         items: order.items
    //     }
    // })

    res.json({items: items.map(item=> item.toObject({getters: true}))});
}

exports.getItems = getItems;