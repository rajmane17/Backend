import { Schema, model} from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        // we can pass custom error message if we want
        required: [true, "Password is required"],
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    avatar: {
        type: String, // we will store the image in cloudinary aur yaha bs url store hoga
        required: true
    },
    coverImage: {
        type: String,
    },
    refreshToken:{
        type: String
    }
},{timestamps: true})

userSchema.pre("save", async function (next) {
    // agar password modified nhi hua to next ko call kro.
    // brackets me jo nhi nam diya hai vo field modify hui hai ya nhi ye isModified method check krta hai.
    if (!this.isModified("password")) return next();

    // hash the password.
    this.password = await bcrypt.hash(this.password, 10);
})

// Designing custom methods like updateOne, insert, etc
userSchema.methods.checkPassword = async function (password) {
     // It will return true if password is correct else false
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function (){
    const user = this;

    const token = jwt.sign({
        _id: user._id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
    }, 
    process.env.TOKEN_SECRET,
    {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
    })
    return token;
}

userSchema.methods.generateRefreshToken = function (){
    const user = this;

    const refreshToken = jwt.sign({
        _id: user._id,
    }, 
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
    })
    return refreshToken;
}

export const User = model("User", userSchema);