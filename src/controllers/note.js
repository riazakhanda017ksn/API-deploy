const { restart } = require("nodemon")
const Note = require("../models/Note")
const connectDB = require("../db")



//Get note using: GET: "api/note/getnote"
const getNoteController = async (req, res) => {
    try {
        await connectDB();
        const note = await Note.find()
        if (!note) {
            res.send("Nothing yet note right now!!!")
        } else {
            res.send({ note }).status(200)
        }
    } catch (error) {
        res.status(500).send(`Internal server error - ${error.message}`)
    }
}


// create note using Post: "/api/note/postnote"
const postNoteController = async (req, res) => {
    try {
        await connectDB()
        const { title, description, tag } = await req.body

        const note = await new Note({
            title,
            description,
            tag
        })
        const saveNote = await note.save()

        return res.json({
            message: "Note created successfully",
            success: true,
            status: 201,
            saveNote
        })
    } catch (error) {
        return res.status(404).send(`Don't create note - ${error.message}`)
    }
}


// update note using PUT: "/api/note/updatenote/:id"

const updateNoteController = async (req, res) => {
    try {
        await connectDB();
        const { title, description, tag } = req.body
        console.log(req.params.id);
        const newNote = {}

        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        let note = await Note.findById(req.params.id)

        if (!note) {
            res.status(404).send("Not Found");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        return res.json({
            message: "Note Update Success",
            status: 201,
            success: true,
            note
        })


    } catch (error) {
        return res.json({
            message: `Internal server error-${error.message}`,
            success: false,
            status: 403
        })
    }
}


// delete note by id.. using DELETE "/api/note/deletenote/:id"

const deleteNoteController = async (req, res) => {
    try {
        await connectDB()

        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found"); }

        note = await Note.findByIdAndDelete(req.params.id);
        return res.json({ message: "Note has been deleted", success: true, note: note });
    } catch (error) {
        return res.json({
            message: `Deleted Failed - ${error.message}`,
            success: false,
            status: 404
        })
    }
}

// status update by id use PATCH  "/api/note/notestatus/:id"
const noteStatusController = async (req, res) => {
    try {
        await connectDB();
        const { status} = req.body
        const newNote = {}

        if (status) { newNote.status = status; }

        let note = await Note.findById(req.params.id)

        if (!note) {
            res.status(404).send("Not Found");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        return res.json({
            message: "Note Update Success",
            status: 201,
            success: true,
            note
        })
    } catch (error) {
        return res.json({
            message: `Internal server error-${error.message}`,
            success: false,
            status: 403
        })
    }
}


module.exports = { getNoteController, postNoteController, updateNoteController,deleteNoteController, noteStatusController }