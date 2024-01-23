const express = require("express");
const auth = require("./auth");
const article = require("./article");
const user = require("./user");
const admin = require("./admin");

const router = express.Router();

router.use("/auth", auth);
router.use("/articles", article);
router.use("/users", user);
router.use("/admin", admin);

module.exports = router;