const express = require('express');
const router = express.Router({mergeParams:true});
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { addNewCommentToArticle, getAllCommentsByArticle } = require("../controllers/comment");
const Comment = require('../models/Comment');

router.post("/", getAccessToRoute, addNewCommentToArticle);
router.get("/", getAllCommentsByArticle);

module.exports = router;