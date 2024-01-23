const express = require("express");
const { getAccessToRoute, getAdminAccess } = require("../middlewares/authorization/auth");
const { blockUser, deleteUser } = require("../controllers/admin");
const { checkUserExist } = require("../middlewares/database/databaseErrorHelpers");
const router = express.Router();
router.use([getAccessToRoute, getAdminAccess])
// Kullanıcı Engelleme
router.get("/user/block/:id", checkUserExist, blockUser);
router.delete("/user/delete/:id", checkUserExist, deleteUser);
// Kullanıcı Silme


module.exports = router;