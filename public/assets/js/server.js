const express = require('express');
const fs = require('fs');
const db = require('./db/db.json');


const app = express();
const PORT = process.env.port || 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static("./public/"));

require()(app);
require()(app);

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
})