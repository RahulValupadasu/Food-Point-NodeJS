const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/authentication');
const bodyParser = require('body-parser').json();

//cretaing a user
router.post('/users',async (req,res)=>{
      const user = new User(req.body);
      try
      {
            await user.save();
            const token = await user.generateAuthenticateTokens();
            res.status(201).send({user,token});
            // console.log(token);
            // console.log(user);
      }
      catch(e){
            res.status(400).send({"error" : "something went wrong"})
      }
});

//logging in a user
router.get('/users/login',bodyParser,async (req,res)=>{
      try{
      const user = await User.findByCredentials(req.body.email, req.body.password);
      console.log(user);
      const token = await user.generateAuthenticateTokens();
      console.log(token)
      res.status(200).send({user,token});
}catch(e){
      res.status(400).send();
}
});

//logging out a user
router.get('/users/logout',[bodyParser,auth],async (req,res)=>{
      const user = req.user;
      const current_device_token = req.token;
      user.tokens = user.tokens.filter((token)=>{
            return current_device_token!==token.authToken;
      });
      await user.save();
      console.log(user.tokens);
      res.status(200).send(user);
})

//user update
router.patch('/users/update',[auth,bodyParser],async (req,res)=>{
    try{const updates = Object.keys(req.body);
    const validUpdates = ['name','email'];

    const isValidupdate = updates.every((update)=>{
          return validUpdates.includes(update);
    });

    if(!isValidupdate){
          throw new Error("Not a valid update");
    }
    const user =  await User.findById({_id:req.user._id});
    console.log(user)
    updates.forEach((update)=>{
          user[update]=req.body[update];
    });
    await user.save();
    res.status(200).send(user);
}catch(e){
      res.send({"error":e});
      console.log(e)
}
      
});

module.exports=router;