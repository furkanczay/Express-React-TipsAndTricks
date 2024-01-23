const User = require("../models/User");
const CustomError = require('../helpers/error/customError');
const asyncErrorWrapper = require('express-async-handler');

const blockUser = asyncErrorWrapper(async (req,res,next) => {
      const { id } = req.params;

      const user = await User.findById(id);
      user.blocked = !user.blocked;
      await user.save();
      const message = user.blocked ? `${user.username}(${user.email}) kullanıcısı başarıyla engellendi` : `${user.username}(${user.email}) kullanıcısının engeli başarıyla kaldırıldı`;
      return res.status(200).json({
            success: true,
            message
      })
});

const deleteUser = asyncErrorWrapper(async (req,res,next) => {
      const { id } = req.params;
      await User.deleteOne({_id: id});
      return res.status(200).json({
            success: true,
            message: "Kullanıcı başarıyla silindi"
      })
})

module.exports = {
      blockUser,
      deleteUser
}