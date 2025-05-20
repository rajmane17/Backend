import express from "express"
import { registerUser, userLogin, handleLogOut } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router()

router.route("/register").post(
    // Now we can send files because of this
    upload.fields([
        {
            // This name should be same in frontend also 
            name: "avatar",
            maxCount: 1,
        }, {
            name: "coverImage",
            maxCount: 1,
        }
    ]),
    registerUser
)

router.route("/login").post(userLogin)

// secured routes
router.route("/logout").post (verifyJWT, handleLogOut)

export default router;