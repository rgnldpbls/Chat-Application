const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database/chat')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/', async(req, res) => {
    const results = await db.insertMessage(req.body);
    res.status(201).json();
})

app.get('/', async(req, res) => {
    const chat = await db.getAllMessages();
    const msg = chat.map(record => record.message);
    res.status(200).json({msg});
})

app.delete('/', async(req, res) => {
    await db.deleteAllMessages();
    res.status(200).json();
});

app.listen(5000, () => {console.log("Server started on port 5000") })