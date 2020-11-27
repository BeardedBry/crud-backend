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

mongoose.connect(url, { useNewUrlParser: true});

const db = mongoose.connection;
db.once('open', _ => {
    console.log('Database connected: ', url);
})

db.on('error', err =>{
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

ListItem.find({},(err, res)=>{
    console.log(res);
});


// mongo client way
//let db;
// MongoClient.connect(url, {useNewUrlParser: true}, (err, client)=>{
//     if(err) return console.log(err);

//     // store ref to db
//     db = client.db(dbname);
//     console.log(`Connected MongoDB: ${url}`);
//     console.log(`Database: ${dbname}`);
// });