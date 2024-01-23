const CustomError = require('../../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");
const User = require("../../models/User");
const Article = require("../../models/Article");
const Comment = require("../../models/Comment");
const jwt = require('jsonwebtoken');
const { isTokenIncluded, getAccessTokenFromHeader } = require("../../helpers/authorization/tokenHelpers");

const getAccessToRoute = (req,res,next) => {
      const { JWT_SECRET_KEY } = process.env;
      // Token Kontrol Et
      // Custom Error ile hata durumlarını ele al
      if(!isTokenIncluded(req)){
            return next(new CustomError("Geçersiz erişim anahtarı!", 401))
      }
      const accessToken = getAccessTokenFromHeader(req);
      jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
            if(err) {
                  return next(new CustomError("Geçersiz erişim anahtarı", 401));
            }
            req.user = {
                  id: decoded.id,
                  email: decoded.email,
            }
            next();
      });    
};

const getAdminAccess = asyncErrorWrapper(async (req,res,next) => {
      const { id } = req.user;
      const user = await User.findById(id);

      if(user.role !== "admin"){
            return next(new CustomError("Bu erişimi elde etmek için admin olmanız gerekmektedir", 403));
      }
      next();
});

const getArticleOwnerAccess = asyncErrorWrapper(async (req,res,next) => {
      const userId = req.user.id;
      const articleId = req.params.id;

      const article = await Article.findById(articleId);
      console.log(article.author, userId);

      if(article.author != userId){
            return next(new CustomError("Yalnızca yazının sahibi yazıyı düzenleyebilir", 403));
      }
      next();
});

const getCommentOwnerAccess = asyncErrorWrapper(async (req,res,next) => {
      const userId = req.user.id;
      const commentId = req.params.comment_id;

      const comment = await Comment.findById(commentId);

      if(comment.author != userId){
            return next(new CustomError("Yalnızca yorum sahibi yorumu düzenleyebilir", 403));
      }
      next();
})

module.exports = {
      getAccessToRoute,
      getAdminAccess,
      getArticleOwnerAccess,
      getCommentOwnerAccess
}