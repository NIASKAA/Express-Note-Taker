const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');


const app = express();
const PORT = process.env.PORT || 3000;

const dataNotes = JSON.parse(
    fs.readFileSync(path.join(__dirname, './db/db.json'), (err, data) => {
        if(err){
            console.log(err);
        }
    })
);

const updateNotes = dataNotes => {
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(dataNotes), 
    err => {
        if(err)
            console.log(err);
    })
};

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    return res.json(dataNotes);
});

app.get('/index', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/assets/js/index.js'))
);

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    let addId = dataNotes.length;
    newNote.addId = addId + 1;
    dataNotes.push(newNote);
    updateNotes(dataNotes);
    return res.json(dataNotes);
});

app.delete('./api/notes/:id', (req, res) => {
    let id = req.body.id;
    delete dataNotes[id - 1];
    updateNotes(dataNotes);
    res.send(dataNotes);
});

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});