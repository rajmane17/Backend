const express = require("express");
const router = express.Router();
const { handleUserLogin, handleUsersignup } = require("../controllers/user")

router.post("/signup", handleUsersignup)
router.post("/login", handleUserLogin)

module.exports = router;