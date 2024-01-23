const express = require("express");
const { getAllArticles, newArticle, getSingleArticle } = require("../controllers/article");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { checkArticleExist } = require("../middlewares/database/databaseErrorHelpers");
const router = express.Router();

router.get("/", getAllArticles)
router.post("/new", getAccessToRoute, newArticle);
router.get("/:id", checkArticleExist, getSingleArticle);

module.exports = router;