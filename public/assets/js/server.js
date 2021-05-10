const express = require('express');
const fs = require('fs');
const db = require('./db/db.json');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'notes.html'))
);

app.get('/index', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/assets/js/index.js'))
);

app.get('/api/notes', (req, res) => {
    return res.json();
});

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
})