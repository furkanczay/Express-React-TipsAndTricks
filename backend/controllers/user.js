const User = require('../models/User');
const CustomError = require('../helpers/error/customError');
const asyncErrorWrapper = require('express-async-handler');

const getSingleUserById = asyncErrorWrapper(async (req,res,next) => {
      const { id } = req.params;
      const user = await User.findById(id);
      if(!user){
            return next(new CustomError("Kullanıcı bulunamadı", 400));
      }

      return res.status(200).json({
            success: true,
            data: user
      })
});

const getSingleUserByUsername = asyncErrorWrapper(async (req,res,next) => {
      const { username } = req.params;
      const user = await User.findOne({username});
      if(!user){
            return next(new CustomError("Kullanıcı bulunamadı", 400));
      }

      return res.status(200).json({
            success: true,
            data: user
      })
});

module.exports = {
      getSingleUserById,
      getSingleUserByUsername
}