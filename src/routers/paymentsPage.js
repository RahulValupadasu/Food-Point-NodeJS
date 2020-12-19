const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');

router.get('/paymentPage',auth,(req,res)=>{
    console.log("Authenticated properly");
    res.render('paymentPage');
    
})

module.exports = router;