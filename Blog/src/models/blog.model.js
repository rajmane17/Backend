import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: [true, "Please enter a title"],
        index: true,
    },
    content: {
        type: String,
        required: true,
    }
})

export const Blog = mongoose.model("Blog", blogSchema)