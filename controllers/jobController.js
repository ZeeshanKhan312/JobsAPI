const getAllJob=async(req,res)=>{
    res.status(200).json();
}

const getJob=async(req,res)=>{
    res.send('get all job');
}


const createJob=async(req,res)=>{
    res.send('get all job');
}

const updateJob=async(req,res)=>{
    res.send('get all job');
}

const deleteJob=async(req,res)=>{
    res.send('get all job');
}

module.exports={getAllJob, getJob,createJob,
    updateJob, deleteJob}