const express = require("express");
const router = express.Router();
const USER = require("../models/user")

// /user/login
router.get("/login", (req, res) => {
    return res.render("login")
})

router.get("/signup", (req, res) => {
    return res.render("signup")
})

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).render("signup", {
            message: "please fill all the fields"
        })
    }

    try {
        await USER.create({
            name,
            email,
            password
        })
        return res.redirect("/")
    } catch (error) {
        console.log("couldn't create the users", error);
    }

})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).render("login", {
            message: "please fill all the fields"
        })
    }

    try {
        const token = await USER.validatePassNGenerateToken(email, password);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        console.error("Error in login");
        return res.status(500).send("Internal Server Error");
    }

})

router.get("/logout", (req, res) =>{
    return res.clearCookie("token").redirect("/")
})


module.exports = router;