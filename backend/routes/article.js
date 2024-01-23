const express = require("express");
const { getAllArticles } = require("../controllers/article");

const router = express.Router();

router.get("/", getAllArticles)

module.exports = router;