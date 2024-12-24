const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    // home page
    const user = req.user;
    // The below if statement helps us to render home page only if we r logged in
    // comment this if statement, if u don't want this functionality
    if( !user) {
        res.redirect("/login");
    }
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