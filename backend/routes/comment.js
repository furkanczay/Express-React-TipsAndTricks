const express = require('express');
const router = express.Router({mergeParams:true});
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { addNewCommentToArticle } = require("../controllers/comment");
const Comment = require('../models/Comment');

router.get('/', (req, res, next) => {
      console.log(req.params);
      return res.status(200)
            .json({
                  success: true,
                  message: 'Comment route'
            });
});

router.post("/", getAccessToRoute, addNewCommentToArticle)

module.exports = router;