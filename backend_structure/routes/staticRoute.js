const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    // home page
    return res.render("home");
})

router.get("/signup", (req, res) => {
    // signup page
    return res.render("signup");
    
})

router.get("/login", (req, res) => {
    // login page
    return res.render("login");
})

module.exports = router;