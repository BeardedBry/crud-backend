const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
//const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const ListItem = require('./models/ListItem');

// consts:
const url = "mongodb://localhost:27017/crud"
//const dbname = "crud";

// Middleware
app.use(cors({
    origin: 'http://localhost:3001',
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, function () {
    console.log('listening on 3000')
});

app.get('/', (req, res) => {
    res.send('yo');
});

// Show list
app.get('/list', async (req, res) => {
    const items = await ListItem.find();
    res.send(items);
});

// Get individual list item
app.get('/list/:itemTitle', async (req, res) => {
    const item = await ListItem.findOne({ title: req.params.itemTitle });
    console.log(req.params.itemTitle);
    console.log('item: ', item);
    res.send(item);
});

// Post new Item
app.post('/list/add/', async (req, res) => {
    const newItem = new ListItem({
        title: req.body.title
    });
    newItem.save((err) => {
        err ? res.send(err) : res.send(newItem);
    })
});

// Post find and edit one
app.put('/list/edit', async (req, res) => {
    const item = await ListItem.findOne({ title: req.body.oldTitle });
    try {
        item.title = req.body.newTitle;
        item.save((err) => {
            err ? res.send(err) : res.send('modified item');
        })
    } catch (e) {
        res.send(e);
    }
});

// Delete an item
app.post('/list/remove', async (req, res) => {
    const item = await ListItem.findOne({ title: req.body.title });
    if(item){
        await item.remove();
        res.send('removed');
    }
});


mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;
db.once('open', _ => {
    console.log('Database connected: ', url);
})

db.on('error', err => {
    console.error('connection error', err);
});

// const todo = new ListItem({
//     title: 'make app',
// });

// todo.save((error, document)=>{
//     if(error) console.error(error);
//     console.log(document);
// })

// const learnMongo = new ListItem({
//     title: 'Learn Mongo',
// });

// learnMongo.save();

// ListItem.find({},(err, res)=>{
//     console.log(res);
// });


// mongo client way
//let db;
// MongoClient.connect(url, {useNewUrlParser: true}, (err, client)=>{
//     if(err) return console.log(err);

//     // store ref to db
//     db = client.db(dbname);
//     console.log(`Connected MongoDB: ${url}`);
//     console.log(`Database: ${dbname}`);
// });