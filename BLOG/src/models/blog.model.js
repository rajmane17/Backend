import {Schema, model} from "mongoose";

const blogModel = new Schema({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    ImageUrl: {
        type: String,
        required: true,
    }
}, {timestamps: true})

export const Blog = model('Blog', blogModel);