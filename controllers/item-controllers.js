const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-errors');
const Fawn = require('fawn');
const Item = require('../models/item');

//Fawn.init(mongoose);

const getItems = async (req, res, next) => {
    let items;
   
    console.log(req.query.today);

    if(req.query.today !== undefined) {
        dateTime = req.query.today.split("T");
    } 

    // console.log(dateTime[0]);

    // console.log("today ", req.query.today);

    let today = new Date(dateTime[0]);
    
    let tomorrow = new Date(today);
   
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

  
    try {

        items = await Item.find({});
    } catch(error) {
        return next(new HttpError("Fetching ordres failed, please try again later", 500));
    }

    console.log(items);

    let filteredItems = [];

    items.map(item => {
        console.log("startDate", item.startDate);
        console.log("endDate", item.startDate);
        console.log("tomorrow", tomorrow);
        if(tomorrow  >= item.startDate  && tomorrow  <= item.endDate ) {
            filteredItems.push(item)
        }
    })

   

    res.json({items: filteredItems.map(item=> item.toObject({getters: true}))});
}

const editItem = async (req, res, next) => {
    const itemId = req.params.id;

    const item = await Item.findById(itemId);



    console.log(req.body.occurenceArray);
    
    let i = 0;
    let j = 0;
    

    for(let i = 0; i < item.occurrenceArray.length; i++) {
        item.occurrenceArray[i] = req.body.occurenceArray[i];
    }

    res.json(item)
}

exports.getItems = getItems;
exports.editItem = editItem;