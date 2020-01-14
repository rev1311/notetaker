const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes/", function(req, res) {
    return res.json(notes)
});


// app.post("/api/notes", function(req, res) {
    // var newcharacter = req.body;

    // newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
  
    // console.log(newcharacter);
  
    // characters.push(newcharacter);
  
    // res.json(newcharacter);
// });


app.listen(PORT, function() {
    console.log("Listening on port: " + PORT)
});
