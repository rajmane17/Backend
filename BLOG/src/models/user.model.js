import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    profilePicture: {
        type: String,
    },
    salt: {
        type: String,
    },
    refreshTokens: {
        type: String,
    }
},{timestamps: true});

userSchema.pre("save", async function (next) {

    const user = this;
    if( !user.isModified("password") ) return next();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt)

    this.salt = salt;
    this.password = hashedPassword;
    next();
})

// designing our custom methods.
userSchema.methods.checkPassword = async function (password) {
    // return true if the password if correct, else false
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAcessToken = function () {
    const payload = {
        _id: this._id,
        fullName: this.fullName,
        email: this.email,
        userName: this.userName,
    }

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn:  process.env.ACCESS_TOKEN_EXPIRES_IN,
    })
    return token;
}

userSchema.methods.generateRefreshAcessToken = function () {
    const payload = {
        _id: this._id,
    }

    const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    })
    return token;
}

export const User = mongoose.model("User", userSchema);