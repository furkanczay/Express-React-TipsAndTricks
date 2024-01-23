const express = require("express");
const auth = require("./auth");
const article = require("./article");
const user = require("./user");

const router = express.Router();

router.use("/auth", auth);
router.use("/articles", article);
router.use("/users", user)

module.exports = router;