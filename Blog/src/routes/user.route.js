import express from "express"
const router = express.Router();

// http://locahost:8000/api/v1/user/
router.get("/signin", (req, res) => {
    return res.redirect("signin");
})

router.post("/signin", (req, res) => {})

router.get("/signup", (req, res) => {
    return res.redirect("signup");
})

router.post("/signup", (req, res) => {})

export default router;