const express = require("express");
const { getSingleUserById, getSingleUserByUsername } = require("../controllers/user");
const router = express.Router();

router.get("/:id", getSingleUserById);
router.get("/u/:username", getSingleUserByUsername);


module.exports = router;