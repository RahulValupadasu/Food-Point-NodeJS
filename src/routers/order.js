const express = require('express');
const Order = require('../models/order');
const auth = require('../middleware/authentication');
const router = new express.Router();
const bodyParser = require('body-parser').json();


router.post('/orders',[bodyParser,auth], async (req,res)=>{
    const user = req.user;
    // console.log(req.body)
    // console.log({userId:user._id,...req.body})
    const order = new Order({userId:user._id, ...req.body});
    // console.log(order)
    try{
         await order.save();
         res.status(200).send(order);
    }catch(e){
         res.status(401).send(e);
    }
})

module.exports = router;