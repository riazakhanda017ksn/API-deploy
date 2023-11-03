const express = require("express");
const router = express.Router();
const { getNoteController, postNoteController, updateNoteController, deleteNoteController, noteStatusController } = require("../controllers/note")



//All Router for note collections
router.get("/getnote", getNoteController)
router.post("/postnote", postNoteController)
router.put("/updatenote/:id", updateNoteController)
router.delete("/deletenote/:id", deleteNoteController)
router.patch("/notestatus/:id", noteStatusController)


module.exports = router;