const express = require('express');
const router = express.Router({mergeParams:true});
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { checkArticleAndAnswerExist } = require("../middlewares/database/databaseErrorHelpers");
const { addNewCommentToArticle, getAllCommentsByArticle, getSingleComment, editComment, deleteComment } = require("../controllers/comment");
const { getCommentOwnerAccess } = require("../middlewares/authorization/auth");
const Comment = require('../models/Comment');

router.post("/", getAccessToRoute, addNewCommentToArticle);
router.get("/", getAllCommentsByArticle);
router.get("/:comment_id", checkArticleAndAnswerExist, getSingleComment);
router.put("/:comment_id/edit", [checkArticleAndAnswerExist, getAccessToRoute, getCommentOwnerAccess], editComment);
router.delete("/:comment_id/delete", [checkArticleAndAnswerExist, getAccessToRoute, getCommentOwnerAccess], deleteComment)

module.exports = router;