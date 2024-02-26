const { StatusCodes } = require('http-status-codes');
const Jobs=require('../models/Job');
const {BadRequestError,NotFoundError}=require('../errors/index')

const getAllJob=async(req,res)=>{
    const jobs=await Jobs.find({createdBy:req.user.userID}).sort('createdAt');
    res.status(StatusCodes.OK).json({jobs:jobs,total:jobs.length});
}

const getJob=async(req,res)=>{
    const {user:{userID},params:{id:jobId}}=req
    const job=await Jobs.findOne({_id:jobId, createdBy:userID});
    if(!job)
        throw new NotFoundError(`No Job found with id ${jobId}`);
    res.status(StatusCodes.OK).json({job});
}


const createJob=async(req,res)=>{
    req.body.createdBy=req.user.userID; //manually adding new attributes to the request body
    const job=await Jobs.create(req.body)
    res.status(StatusCodes.CREATED).json({job});
}

const updateJob=async(req,res)=>{
    const{id}=req.params;
    const {userID}=req.user;

    const job=await Jobs.findOneAndUpdate({_id:id,createdBy:userID},req.body,{
        new:true,
        runValidators:true
    });
    if(!job){
        throw new NotFoundError(`No job found with id: ${id}`);
    }
    res.status(StatusCodes.ACCEPTED).json(job);
}

const deleteJob=async(req,res)=>{
    const{
        params:{id:jobId},
        user:{userID}}=req
    const job=await Jobs.findOneAndDelete({_id:jobId,createdBy:userID});
    if(!job){
        throw new NotFoundError(`Job with id:${jobId} not found`);
    }
    res.status(StatusCodes.OK).json({msg:`Job with id:${jobId} deleted`});
}

module.exports={getAllJob, getJob,createJob,
    updateJob, deleteJob}