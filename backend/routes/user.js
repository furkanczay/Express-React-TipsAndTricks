const express = require("express");
const { getSingleUserById, getSingleUserByUsername, getAllUsers } = require("../controllers/user");
const { checkUserExist } = require("../middlewares/database/databaseErrorHelpers");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", checkUserExist, getSingleUserById);
router.get("/u/:username", checkUserExist, getSingleUserByUsername);


module.exports = router;