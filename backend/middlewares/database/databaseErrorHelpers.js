const User = require("../../models/User");
const CustomError = require('../../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const checkUserExist = asyncErrorWrapper(async (req,res,next) => {
      const { id, username } = req.params;
      const user = await User.findOne({username}) || await User.findById(id);
      if(!user){
            return next(new CustomError("Kullanıcı bulunamadı", 400));
      }
      req.dataUser = user;
      next();
});

module.exports = {
      checkUserExist
}