const express=require('express');
const router=express.Router();

const{getAllJob, getJob, createJob,
    updateJob, deleteJob}=require('../controllers/jobController');

router.route('/').post(createJob).get(getAllJob);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

module.exports=router