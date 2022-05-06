const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demoVendredi')
    .then(() => console.log('Connected to mongo'))
    .catch((err) => console.log('Pas pu se connecter', err))

const userSchema = new mongoose.Schema({
    name: String,
    username : String,
    creation: {type: Date, default: Date.now()},
    isAdmin: Boolean,
    age: Number
})

