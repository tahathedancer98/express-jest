const express = require('express')
const app = express();

const CollectionDB = require('./CollectionDB');
const Courses = new CollectionDB("Courses");
const Accounts = new CollectionDB("Accounts");

Courses.maBD.set(0, {idUser: 1, boissons : 10});
Accounts.maBD.set(1, {name: "Rémi"});

app.get('/', (req , res) => {
    //Tous les courses : Courses.all()
    // Tous les users : Accounts.all()
    res.status(200).json({message: "Hello World"});
})

app.listen(3000)