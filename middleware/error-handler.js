const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  //CREATING A ERROR OBJECT
  let customError={
    statusCode:err.statusCode ||StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message||'Something Went Wrong'
  }
  if(err.code && err.code ==11000){
    customError.msg=`User with same ${Object.keys(err.keyValue)} already exist!!`
    customError.statusCode=400
    return res.status(customError.statusCode).json({msg:customError.msg})
  }
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({msg:customError.msg});
}

module.exports = errorHandlerMiddleware
