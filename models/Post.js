const mongoose = require('mongoose')
const { Schema } = mongoose

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 255
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    description: {
        type: String,
        required: true,
        max: 255
    },
    slug: {
        type: String, 
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema)