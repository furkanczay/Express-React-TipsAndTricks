const express = require("express");
const auth = require("./auth");
const article = require("./article");

const router = express.Router();

router.use("/auth", auth);
router.use("/articles", article);

module.exports = router;