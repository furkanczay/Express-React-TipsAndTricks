const express = require("express");
const { register, getUser, login, logout, imageUpload } = require("../controllers/auth");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { profileImageUpload } = require("../middlewares/libs/imageUpload");

const router = express.Router();

router.post("/register", register);
router.get("/profile", getAccessToRoute, getUser);
router.post("/login", login);
router.post("/logout", getAccessToRoute, logout);
router.post("/upload", [getAccessToRoute, profileImageUpload.single("profile_image")], imageUpload)


module.exports = router;