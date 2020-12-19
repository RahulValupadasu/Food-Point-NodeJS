const mongoose = require('mongoose');
const Menu = require('../models/menu');

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    //here I have  'embedded' the items as there will be not much items per order , if they are many I would be using 'referencing' the id of menu 
    items:[{
        item:{
            type:String,
            required:true
        },
        quantity:{
            type:Number
        }
    }],
    totalAmount:{
        type:Number
    }
});


const Order = mongoose.model('Order',orderSchema);

module.exports = Order;