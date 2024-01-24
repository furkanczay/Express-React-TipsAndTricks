const express = require('express');
const router = express.Router({mergeParams:true});
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { checkArticleAndAnswerExist } = require("../middlewares/database/databaseErrorHelpers");
const { addNewCommentToArticle, getAllCommentsByArticle, getSingleComment, editComment, deleteComment } = require("../controllers/comment");
const { getCommentOwnerAccess } = require("../middlewares/authorization/auth");
const commentQueryMiddleware = require("../middlewares/query/commentQueryMiddleware");
const Comment = require('../models/Comment');

router.post("/", getAccessToRoute, addNewCommentToArticle);
router.get("/", commentQueryMiddleware(Comment, {
      population: {
            path: "author",
            select: "firstName lastName email username profileImage"
      }
}), getAllCommentsByArticle);
router.get("/:comment_id", checkArticleAndAnswerExist, getSingleComment);
router.put("/:comment_id/edit", [checkArticleAndAnswerExist, getAccessToRoute, getCommentOwnerAccess], editComment);
router.delete("/:comment_id/delete", [checkArticleAndAnswerExist, getAccessToRoute, getCommentOwnerAccess], deleteComment)

module.exports = router;