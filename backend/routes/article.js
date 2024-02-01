const express = require("express");
const comment = require("./comment");
const { getAllArticles, newArticle, getSingleArticle, editArticle, deleteArticle, likeArticle, undoLikeArticle } = require("../controllers/article");
const { getAccessToRoute, getArticleOwnerAccess } = require("../middlewares/authorization/auth");
const { checkArticleExist } = require("../middlewares/database/databaseErrorHelpers");
const articleQueryMiddleware = require("../middlewares/query/articleQueryMiddleware");
const Article = require("../models/Article");
const router = express.Router();

router.get("/", articleQueryMiddleware(Article, {
      population: {
            path: "author",
            select: "firstName lastName profileImage username, email"
      }
}), getAllArticles)
router.post("/new", getAccessToRoute, newArticle);
router.get("/:id", checkArticleExist, getSingleArticle);
router.put("/:id/edit", [getAccessToRoute, checkArticleExist, getArticleOwnerAccess], editArticle);
router.delete("/:id/delete", [getAccessToRoute, checkArticleExist, getArticleOwnerAccess], deleteArticle);
router.get("/:id/like", [getAccessToRoute, checkArticleExist], likeArticle);
router.get("/:id/undo-like", [getAccessToRoute, checkArticleExist], undoLikeArticle);
router.use("/:article_id/comments", checkArticleExist, comment);

// /api/{id}/comments
module.exports = router;