const express = require('express')
const app = express();

const CollectionDB = require('./CollectionDB');
const Courses = new CollectionDB("Courses");
const Accounts = new CollectionDB("Accounts");

Courses.maBD.set(0, {idUser: 1, boissons : 10});
Accounts.maBD.set(1, {name: "Rémi"});

/* Logique d'authentification */
function authGuard(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({erreur: "Vous devez vous connecter"})
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY); 
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
    res.status(200).json({message: "Hello World"});
})
app.get('/', (req , res) => {
    // Tous les courses : Courses.all()
    // Tous les users : Accounts.all()
    res.status(200).json({message: "Hello World"});
})

app.listen(3000)