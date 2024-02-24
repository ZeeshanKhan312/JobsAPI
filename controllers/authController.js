const { StatusCodes } = require('http-status-codes');
const User=require('../models/User');
// const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

const register=async(req,res)=>{
    //MONGOOSE VALIDATOR

    //PASSWORD HASHING-> bcryptjs
    // const {name, email, password}=req.body;
    // const salt=await bcryptjs.genSalt(10); //will create the random byte 
    // const hashedPasw=await bcryptjs.hash(password,salt);
    // const tempUser={name, email, password:hashedPasw}
    // await User.create(tempUser);     

    const user=await User.create(req.body) //THE HASHING PART WILL BE PERFORMED AUTOMATICALLY IN THE USER MODEL CLASS BEFORE SAVING
    const token=user.createJWT(); //JWT SIGN() WILL ALSO BE PERFORMED IN USER MODEL CLASS
    res.status(StatusCodes.CREATED).json({userName:user.name,token});
}

const login=async(req,res)=>{
    
}

module.exports={register, login}