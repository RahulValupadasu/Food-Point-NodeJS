const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    itemName:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    catogery:{
        type:String,
        required:true
    },
    quantitySelected:{
        type:Number,
        required:true
    },
    //have to change type from String to image{my thought}
    image:{
        type:String,
        required:true
    }
});

const Menu = mongoose.model('Menu',menuSchema);

module.exports = mongoose.model('Menu', menuSchema);