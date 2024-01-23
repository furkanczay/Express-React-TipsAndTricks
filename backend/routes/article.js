const express = require("express");
const { getAllArticles, newArticle } = require("../controllers/article");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const router = express.Router();

router.get("/", getAllArticles)
router.post("/new", getAccessToRoute, newArticle);

module.exports = router;