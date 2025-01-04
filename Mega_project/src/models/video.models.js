import { Schema, model} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    videoFile:{
        type: String, // cloudnary url
        required: true
    },
    thumbnail: {
        type: String, // cloudnary url
        required: true
    },
    description:{
        type: String,
        required: true
    },
    duration:{
        type: Number, // cloudnary
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = model("Video", userSchema)