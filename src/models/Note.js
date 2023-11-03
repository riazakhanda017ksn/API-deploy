const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    tag: {
        type: String
    },
    status: {
        type: String,
        default: "Pending"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Note = mongoose.models.Notes || mongoose.model("Notes", noteSchema)

module.exports = Note;