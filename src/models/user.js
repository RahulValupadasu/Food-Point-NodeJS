const mongoose = require('mongoose');
const validator = require('validator');
const bycrpt = require('bcryptjs');
const jswt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate:(email)=>{
            validator.isEmail(email);
        }
    },
    dateOfBirth:{
        type:String,
        required:true,
        trim:true
        // validate:(dateOfBirth)=>{
        //     return dateOfBirth>=18
        // }
    },
    // phoneNumber:{
    //     type:String,
    //     required:true
    // },
    password:{
        type:String,
        required:true,
        // validate:(password)=>{
        //     return 
        // }
    },
    Address:{
        type:String
    },
    tokens:[{
        authToken:{
            type:String
            // required:true
        }
    }]
    
});


userSchema.pre('save',async function(req,res,next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bycrpt.hash(user.password,8)
    }
    next()
});


userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error("unable to login");
    }
    const isValid = await bycrpt.compare(password,user.password);
    if(isValid){
        return user;
    }
    else{
        console.log("password not matching");
        throw new Error("unable to login");
    }

};

userSchema.methods.generateAuthenticateTokens = async function()
{
    const user = this;  
    const authToken = jswt.sign({_id:user._id.toString()},'usertoken');
    // console.log(authToken);
    user.tokens = user.tokens.concat({authToken});
    // console.log(user.tokens);
    await user.save();
    return authToken;
    


}

const User = mongoose.model('User',userSchema);

module.exports = mongoose.model('User', userSchema);
