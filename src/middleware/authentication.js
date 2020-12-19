const jswt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        console.log("token",token);
        const decode = jswt.verify(token,'usertoken');
        console.log("decode",decode._id);
        const user = await User.findOne({_id:decode._id,'tokens.authToken':token});
        if(!user){
            throw new Error();
        }
        req.token = token;
        req.user = user;
        console.log("Authentication properly done");
        next();
    }catch(e){
          res.status(401).send({"error":"Authentication fail"});
    }
}

module.exports = auth;