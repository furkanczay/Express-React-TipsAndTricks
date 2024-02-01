const express = require("express");
const { getSingleUserById, getSingleUserByUsername, getAllUsers } = require("../controllers/user");
const { checkUserExist } = require("../middlewares/database/databaseErrorHelpers");
const userQueryMiddleware = require("../middlewares/query/userQueryMiddleware");
const User = require("../models/User");
const router = express.Router();

router.get("/", userQueryMiddleware(User), getAllUsers);
router.get("/:id", checkUserExist, getSingleUserById);
router.get("/u/:username", checkUserExist, getSingleUserByUsername);


module.exports = router;