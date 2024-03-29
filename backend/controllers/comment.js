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
      return res.status(200).json(res.queryResults)
});

const getSingleComment = asyncErrorWrapper(async (req,res,next) => {
      const { comment_id } = req.params;
      const comment = await Comment.findById(comment_id).populate({
            path: "article",
            select: "title"
      }).populate({
            path: "author",
            select: "firstName lastName username email profileImage"
      });
      return res.status(200).json({
            success: true,
            data: comment
      })
});

const editComment = asyncErrorWrapper(async (req,res,next) => {
      const { comment_id } = req.params;
      const { content } = req.body;
      let comment = await Comment.findById(comment_id);
      comment.content = content;
      await comment.save();
      return res.status(200).json({
            success: true,
            message: "Yorum başarıyla güncellendi",
            data: comment
      })
});

const deleteComment = asyncErrorWrapper(async (req,res,next) => {
      const { comment_id } = req.params;
      const { article_id } = req.params;
      await Comment.findByIdAndDelete(comment_id);
      const article = await Article.findById(article_id);
      article.comments.splice(article.comments.indexOf(comment_id), 1);
      await article.save();

      return res.status(200).json({
            success: true,
            message: "Yorum başarıyla silindi"
      })
});



module.exports = {
      addNewCommentToArticle,
      getAllCommentsByArticle,
      getSingleComment,
      editComment,
      deleteComment
}