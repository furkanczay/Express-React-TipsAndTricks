const express = require("express");
const { getSingleUserById, getSingleUserByUsername } = require("../controllers/user");
const { checkUserExist } = require("../middlewares/database/databaseErrorHelpers");
const router = express.Router();

router.get("/:id", checkUserExist, getSingleUserById);
router.get("/u/:username", checkUserExist, getSingleUserByUsername);


module.exports = router;