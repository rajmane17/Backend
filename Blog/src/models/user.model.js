import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    userName:{
        type:String,
        required:true,
        unique:true,
        index: true,
        lowercase: true
    },
    avatar: {
        type: String, // we will store the image in cloudinary aur yaha bs url store hoga
        required: true
    },
})

export const User = mongoose.model("User", userSchema)