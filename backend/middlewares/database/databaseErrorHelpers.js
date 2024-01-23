const User = require("../../models/User");
const CustomError = require('../../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');
const Article = require("../../models/Article");

const checkUserExist = asyncErrorWrapper(async (req,res,next) => {
      const { id, username } = req.params;
      const user = await User.findOne({username}) || await User.findById(id);
      if(!user){
            return next(new CustomError("Kullanıcı bulunamadı", 404));
      }
      req.dataUser = user;
      next();
});

const checkArticleExist = asyncErrorWrapper(async (req,res,next) => {
      const { id } = req.params;
      const article = await Article.findById(id);
      if(!article){
            return next(new CustomError("Yazı bulunamadı", 404));
      }
      req.dataArticle = article;
      next();
})

module.exports = {
      checkUserExist,
      checkArticleExist
}