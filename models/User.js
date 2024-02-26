const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provide name'],
        minlength:3,
        maxlength:20
    },
    email:{
        type:String,
        required:[true,'please provide email'],
        minlength:5,
        maxlength:50,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please provide valid email'
        ],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password needed!!'],
        minlength:3
    }
})


//GENERATING THE TOKEN
userSchema.methods.createJWT= function(){
    return jwt.sign({userId:this._id, name:this.name},process.env.JWT_SECRET_KEY,{expiresIn:'10h'})
}

//HASHING THE PASSWORD BEFORE SAVING
userSchema.pre('save', async function(next){
    const salt= await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    
    next();
})

//VERIFYING THE PASSWORD WITH ENCRYPTED-PASSWORD
userSchema.methods.verifyPassword=async function(password){
    const isMatch= await bcrypt.compare(password,this.password);
    return isMatch;
}

module.exports=mongoose.model('User',userSchema);