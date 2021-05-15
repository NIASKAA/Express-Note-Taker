const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;


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

app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    let updateNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteList = (noteList.length).toString();

    newNote.id = noteList;
    note.push(updateNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(newNote));
    res.json(newNote);

})

app.delete("/api/notes/:id", (req, res) => {
    let currentNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let deleteId = (req.params.id).toString();
    currentNote = currentNote.filter(selected =>{
        return selected.id != deleteId;
    })

    fs.writeFileSync("./db/db.json", JSON.stringify(currentNote));
    res.json(currentNote);
});

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});