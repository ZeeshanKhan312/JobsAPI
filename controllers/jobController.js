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
    // res.send('jnd');
}


const createJob=async(req,res)=>{
    req.body.createdBy=req.user.userID; //manually adding new attributes to the request body
    const job=await Jobs.create(req.body)
    res.status(StatusCodes.CREATED).json({job});
}

const updateJob=async(req,res)=>{
    res.send('get all job');
}

const deleteJob=async(req,res)=>{
    res.send('get all job');
}

module.exports={getAllJob, getJob,createJob,
    updateJob, deleteJob}