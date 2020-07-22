const express = require('express');
const router = express.Router();
const note = require("../models/note.js");

// Get route to get all notes
router.get("/api/notes", (req, res) => {
  note.getNotes()
    .then(results => res.json(results))
    .catch(err => res.json(err))
});

// Post route to create a note
router.post("/api/notes", (req, res) => {
  note.create(req.body.title, req.body.text)
    .then(results => res.json(results))
    .catch(err => res.json(err))
});

// Delete route to delete a note
router.delete('/api/notes/:id', (req, res) => {
  let id = req.params.id
  note.remove(id)
    .then(results => res.json(results))
    .catch(err => res.json(err))
});

// Export routes for server.js to use.
module.exports = router;
