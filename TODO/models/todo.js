const { Schema, model }  = require("mongoose");

const todoSchema = new Schema({
    todo: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
})

const TODO = model('todo', todoSchema);

module.exports = TODO;