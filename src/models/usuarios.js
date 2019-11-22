const mongoose = require('mongoose');
let Schema= mongoose.Schema;

var userSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String, 
    active: Boolean
},{versionKey:false});

var user = mongoose.model('Users', userSchema);

module.exports = user;