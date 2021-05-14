const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
        if(err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
        if(err) throw err;
        const note = JSON.parse(data);
        const newNote = [];

        note.push(req.body);

        // UpdateNote function will basically add 1 to the id slot so new notes can all have different id for delete access
        for(let i = 0; i < note.length; i++){

            const newNote = {
                title: note[i].title,
                text: note[i].text,
                id: i
            }
            newNote.push(newNote);
        }

        // Now we append the data from newNote to the db.json
        fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(newNote, null, 2), (err) => {
            if(err) throw err;
            res.json(req.body);
        });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
        if(err) throw err;
        const note = JSON.parse(data);
        const currentNote = [];

        for(let i = 0; i < note.length; i++){
            if(i !== id){

                const newNote = {
                    title: note[i].title,
                    text: note[i].text,
                    id: currentNote.id
                };
                currentNote.push(newNote);
            }
        }
        fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(currentNote, null, 2), (err) => {
            if(err) throw err;
            res.json(req.body);
        });
    });
});

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});