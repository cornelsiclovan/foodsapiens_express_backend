const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-errors');
const Fawn = require('fawn');
const Order = require('../models/order');

Fawn.init(mongoose);

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

    console.log("post");
    //console.log(req.body);

     const {
         wp_id,
         name,
         address1,
         address2,
         city,
         items,
     } = req.body;

     let existingOrder;

    try {
        existingOrder = await Order.findOne({ wp_id: wp_id })
    } catch (err) {
        return next(new HttpError('Please try again later. Service unavailable', 500));
    }

    if(existingOrder) {
        return next(new HttpError('This order already exists', 400))
    }

     items.forEach(element => {
        element.occurrenceArray = [];

        let i = element.occurence;

        while(i --) {
            element.occurrenceArray.push(0);
        }

        element.wp_id = wp_id;
        element.clientName = name;
        element.address1 = address1;
        element.address2 = address2;
        element.city = city;

        try {
            new Fawn.Task().save('items', element).run();
        } catch(error) { 
            error = new HttpError(error, 500);
            return next(error);
        }
     });

    const createdOrder = new Order({
        wp_id,
        name,
        address1,
        address2,
        city,
        items
    });     


    try {
        new Fawn.Task()
            .save('orders', createdOrder)
            .run();
    } catch(error) {
        error = new HttpError(error, 500);
        return next(error);
    }
    
    res.status(200).json({order: createdOrder});
    console.log(createdOrder);
}

exports.getOrders = getOrders;
exports.createOrder = createOrder;