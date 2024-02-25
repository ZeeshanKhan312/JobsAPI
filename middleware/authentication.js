const User=require('../models/User');
const jwt=require('jsonwebtoken');
const {UnauthenticatedError}=require('../errors/index')

const auth=async(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader|| !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Unauthorised User');
    }
    const token=authHeader.split(' ')[1];

    try{
        const payload=await jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user={userID:payload.userId,name:payload.name}
        next();
    }
    catch(err){
        throw new UnauthenticatedError('Unauthorised User');
    }
}

module.exports=auth