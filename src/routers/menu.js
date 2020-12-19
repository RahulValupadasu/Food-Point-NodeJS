const express = require('express');
const router = new express.Router();
const Menu = require('../models/menu');
const bodyParser = require('body-parser').json();

router.post('/menu',bodyParser, async (req,res)=>{
     console.log(req.body)
     const menu = new Menu(req.body);
     try
     {
     await menu.save();
     // console.log("menu running");
     res.status(201).send(menu);
}catch(e){
     res.status(400).send(e)
}
});

module.exports = router;