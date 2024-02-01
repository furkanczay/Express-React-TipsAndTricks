const User = require("../../models/User");
const CustomError = require('../../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');
const Article = require("../../models/Article");
const Comment = require("../../models/Comment");

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
      const article_id = req.params.id || req.params.article_id
      const article = await Article.findById(article_id);
      if(!article){
            return next(new CustomError("Yazı bulunamadı", 404));
      }
      req.dataArticle = article;
      next();
});

const checkArticleAndAnswerExist = asyncErrorWrapper(async (req,res,next) => {
      const article_id = req.params.article_id;
      const comment_id = req.params.comment_id
      const comment = await Comment.findOne({
            _id: comment_id,
            article: article_id
      });

      if(!comment){
            return next(new CustomError("Bu yazıya bağlı böyle bir yorum bulunamadı!", 404));
      }
      next();   
});

module.exports = {
      checkUserExist,
      checkArticleExist,
      checkArticleAndAnswerExist
}