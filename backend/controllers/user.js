const User = require('../models/User');
const CustomError = require('../helpers/error/customError');
const asyncErrorWrapper = require('express-async-handler');

const getAllUsers = asyncErrorWrapper(async (req,res,next) => {
      return res.status(200).json(res.queryResults)
})

const getSingleUserById = asyncErrorWrapper(async (req,res,next) => {
      const user = req.dataUser

      return res.status(200).json({
            success: true,
            data: user
      })
});

const getSingleUserByUsername = asyncErrorWrapper(async (req,res,next) => {
      const user = req.dataUser

      return res.status(200).json({
            success: true,
            data: user
      })
});

module.exports = {
      getSingleUserById,
      getSingleUserByUsername,
      getAllUsers
}