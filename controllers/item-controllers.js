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

    let dateTime = req.query.today.split("T");
    console.log(dateTime[0]);

    console.log("today ", req.query.today);

    let today = new Date(dateTime[0]);
    console.log(today);
    
    let tomorrow = new Date(86400000 + +today);
   
   
    

    console.log("tomorrow ", tomorrow);

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