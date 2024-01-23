const express = require('express');
const router = express.Router({mergeParams:true});
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { checkArticleAndAnswerExist } = require("../middlewares/database/databaseErrorHelpers");
const { addNewCommentToArticle, getAllCommentsByArticle, getSingleComment } = require("../controllers/comment");
const Comment = require('../models/Comment');

router.post("/", getAccessToRoute, addNewCommentToArticle);
router.get("/", getAllCommentsByArticle);
router.get("/:comment_id", checkArticleAndAnswerExist, getSingleComment);

module.exports = router;