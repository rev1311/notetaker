const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))


app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname,"public/notes.html"))
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname,"public/index.html"))
});

app.get("/api/notes", function(req, res) {
    let theJSON = null;
    fs.readFile("./db/db.json", function(err, data) {
      if (err) throw err;
      theJSON = JSON.parse(data);
      res.json(theJSON);
    });
});

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    fs.readFile("./db/db.json", function(err, data) {
      if (err) throw err;
      let theJSON = JSON.parse(data);
      console.log(theJSON);
      newNote.id = theJSON.length + 1;
      theJSON.push(newNote);
      write(theJSON);
});

function write(theJSON) {
    fs.writeFile("./db/db.json", JSON.stringify(theJSON), function(err, data) {
      if (err) throw err;
      console.log("Successfully saved");
    });
    let responder = {
      noteTitle: req.body.title,
      noteContent: req.body.text,
      ID: theJSON.length
    };

    res.json(responder);
  }
});

app.delete("/api/notes/:id", function(req, res) {
  let id = parseInt(req.params.id);
  // console.log(id);

  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }

  fs.readFile("./db/db.json", function(err, data) {
    if (err) throw err;
    let theJSON = JSON.parse(data);
    console.log(theJSON);

    if (id > theJSON.length || id == 0) {
      res.sendStatus(403);
      return;
    }

    theJSON.splice(id - 1, 1);
    console.log(theJSON);
    write(theJSON);
  });

  function write(theJSON) {
    fs.writeFile("./db/db.json", JSON.stringify(theJSON), function(err, data) {
      if (err) throw err;
      console.log("Successfully saved");
    });
    res.sendStatus(200);
  }
});

app.listen(PORT, function() {
    console.log("Listening on port: " + PORT)
});
