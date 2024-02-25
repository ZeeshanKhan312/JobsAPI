const mongoose=require('mongoose');

const jobSchema= new mongoose.Schema({
    company:{
        type:String,
        required:true,
        maxlength:20
    },
    position:{
        type:String,
        required:true,
        maxlength:50
    },
    status:{
        type:String,
        enum:['Pending', 'Assesment Round','Technical Interview', 'HR Round','Rejected', 'Offer Letter' ],
        default:'Pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true})  //timestamp-> used to automatically manage createdAt & updatedAt properties of data in mongosse

module.exports=mongoose.model('Jobs',jobSchema)