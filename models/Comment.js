const mongoose = require('mongoose')
const { Schema } = mongoose;

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true,
        max: 255
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comment', commentSchema)