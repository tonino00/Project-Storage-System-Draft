const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const moment = require('moment')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    viabilidade: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    startdate: {
        type: String
    },
    enddate: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    situation: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

articleSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    next()
})

module.exports = mongoose.model('Article', articleSchema)