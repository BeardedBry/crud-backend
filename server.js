const express = require('express');
const app = express();
//const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const ListItem = require('./models/ListItem');

// consts:
const url = "mongodb://localhost:27017/crud"
//const dbname = "crud";


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
app.post('/list/add/:newItemTitle', async (req, res) => {
    const newItem = new ListItem({
        title: req.params.newItemTitle
    });
    newItem.save((err) => {
        err ? res.send(err) : res.send('saved item');
    })
});

// Post find and edit one
app.put('/list/edit/:itemTitle/:newItemTitle', async (req, res) => {
    const item = await ListItem.findOne({ title: req.params.itemTitle });
    try {
        item.title = req.params.newItemTitle;
        item.save((err) => {
            err ? res.send(err) : res.send('modified item');
        })
    } catch (e) {
        res.send(e);
    }
});

// Delete an item
app.delete('/list/remove/:itemTitle', async (req, res) => {
    const item = await ListItem.findOne({ title: req.params.itemTitle });
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