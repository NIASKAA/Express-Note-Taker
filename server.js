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

});

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
})