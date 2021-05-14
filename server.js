const express = require('express');
const fs = require('fs');
const path = require('path');
dataNotes = dataNotes();


const app = express();
const PORT = process.env.PORT || 3000;

function dataNotes() {
    let data = fs.readFileSync('./db/db.json');
    let notes = JSON.parse(data);

    for(let i  = 0; i < notes.length; i++){
        notes[i].id = '' + 1;
    }
    return notes;
}


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
    dataNotes.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(dataNotes));
    res.json(true);
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