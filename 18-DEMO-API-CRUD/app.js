

const express = require('express')
const app = express();
require('dotenv').config();
const CollectionDB = require('./CollectionDB');
const Courses = new CollectionDB("Courses");
const Accounts = new CollectionDB("Accounts");

Courses.maBD.set(1, {idUser: 1, boissons : 10});
Accounts.maBD.set(1, {name: "Rémi"});
Accounts.maBD.set(2, {name: "Taha"});

/* Logique d'authentification */
function authGuard(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({erreur: "Vous devez vous connecter"})
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
      req.user = decoded;
      // Le middleware a fait son boulot et peut laisser la place au suivant.
      next();
    } catch (exc) {
      return res.status(400).json({erreur: "Token Invalide"})
    }
}

app.get('/', (req , res) => {
    // Tous les courses : Courses.all()
    // Tous les users : Accounts.all()
    res.status(200).json({message: Accounts.all()});
})
app.get('/courses', [authGuard], (req, res) => {
    const user = Accounts.getOne(req.user.id)
    const courses = Courses.getUserCourses(req.user)
  
    res.status(200).send({courses});
})

app.listen(3000)