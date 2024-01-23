const Article = require("../models/Article");
const Comment = require("../models/Comment");
const CustomError = require('../helpers/error/customError');
const asyncErrorWrapper = require('express-async-handler');

const addNewCommentToArticle = asyncErrorWrapper(async (req,res,next) => {
      const { article_id } = req.params;
      const userId = req.user.id;
      const information = req.body;
      const comment = await Comment.create({
            ...information,
            article: article_id,
            author: userId
      });

      return res.status(201).json({
            success: true,
            message: "Yorum başarıyla eklendi",
            data: comment
      })
});

const getAllCommentsByArticle = asyncErrorWrapper(async (req,res,next) => {
      const { article_id } = req.params;
      const article = await Article.findById(article_id).populate("comments");
      const comments = article.comments
      return res.status(200).json({
            success: true,
            count: comments.length,
            data: comments
      })
})

module.exports = {
      addNewCommentToArticle,
      getAllCommentsByArticle
}