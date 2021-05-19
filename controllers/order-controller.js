const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-errors');

const Order = require('../models/order');


const getOrders = async (req, res, next) => {
    let orders;
    try {
        orders = await Order.find({});
    } catch(error) {
        return next(new HttpError("Fetching ordres failed, please try again later", 500));
    }


    console.log(orders);
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

    res.json({orders: orders.map(order=> order.toObject({getters: true}))});
}

const createOrder = async (req, res, next) => {
    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }

    console.log(req.body);

    // const {
    //     name,
    //     address1,
    //     address2,
    //     city
    // } = req.body;

    // console.log(name);
}

exports.getOrders = getOrders;
exports.createOrder = createOrder;