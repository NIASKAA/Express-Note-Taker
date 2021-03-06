const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Writing out the necessary ports to connect with html pages
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// App.post function first reads the db.json file and whenever a new note is created, it will push it with an id
// After pushing it, it will write to the db.json file as a new note
app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    let updateNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteList = (updateNote.length).toString();

    //create new property called id based on length and assign it to each json object
    newNote.id = noteList;
    //push updated note to the data containing notes history in db.json
    updateNote.push(newNote);

    //write the updated data to db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(updateNote));
    res.json(updateNote);
});

// App.delete function basically checks for the id and uses filter to filter out that id and return the new array list to delete notes
// After that it does the same thing as app.post and write out only the current notes left
app.delete("/api/notes/:id", (req, res) => {
    let currentNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let delNote = (req.params.id).toString();

    //filter all notes that does not have matching id and saved them as a new array
    //the matching array will be deleted
    currentNote = currentNote.filter(selected =>{
        return selected.id != delNote;
    })

    //write the updated data to db.json and display the updated note
    fs.writeFileSync("./db/db.json", JSON.stringify(currentNote));
    res.json(currentNote);
});

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});