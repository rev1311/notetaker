const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const newNotes = {}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname,"/notes.html"))
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname,"/index.html"))
});

app.get("/api/notes", function(req, res) {
    return res.json(newNotes)
})

app.listen(PORT, function() {
    console.log("Listening on port: " + PORT)
});
