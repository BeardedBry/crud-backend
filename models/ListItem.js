const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: { type: String, unique: true }
})

module.exports = mongoose.model('ListItem', listSchema);