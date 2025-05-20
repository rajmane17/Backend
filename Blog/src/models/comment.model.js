import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({})

export const Comment = mongoose.model("Comment", commentSchema)