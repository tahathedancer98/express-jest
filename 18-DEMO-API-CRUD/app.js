// Validation 
const Joi = require("joi");
const bcrypt = require("bcrypt");

// Express + async errors
const express = require("express");
require("express-async-errors"); // bcrypt est asynchrone
const app = express();
app.use(express.json());
/*
 *           JWT TOKEN
 */
const jwt = require('jsonwebtoken');
require('dotenv').config();
if (!process.env.JWT_SECRET_KEY) {
    console.log("ERREUR: vous devez créer une variable d'env JWT_SECRET_KEY");
    process.exit(1);
}
console.log('Reading JWT_SECRET_KEY');
// Get JWT SECRECT KEY FROM .env
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


/*
 *           B D D
 */
const CollectionDB = require('./CollectionDB');
const Courses = new CollectionDB("Courses");
const Accounts = new CollectionDB("Accounts");

Courses.maBD.set(1, {idUser: 2, boissons : 10});
Courses.maBD.set(2, {idUser: 1, boissons : 3});
Accounts.maBD.set(1, {id : 1, name: "Rémi", email :"remi@mail.com", password:"test"});
Accounts.maBD.set(2, {id : 2, name: "Taha", email :"taha@mail.com", password:"test"});

/* Logique d'authentification */
function authGuard(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({erreur: "Vous devez vous connecter"})
    console.log('TOKEN POUR TESTER LES REQUETTES')
    console.log(token)
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
    res.status(200).json({message: Accounts.all()});
})



  

// Connexion
app.post('/login', async (req , res) => {
    // La récupération du body de la requette dans payload
    const payload = req.body;
    const schema = Joi.object({
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(3).max(50).required(),
    });
    // La validation des inputs avec joi
    console.log(payload)
    const { value: connexion, error } = schema.validate(payload);
    // S'il y'a une erreur on renvoie une réponse avec le message d'erreur pour ne pas continuer l'éxecution
    if (error) return res.status(400).send({ erreur: error.details[0].message });
    
    // SI NON ON CHERCHE LE COMPTE DANS LA DB
    const { id, found: account } = Accounts.searchByProperty(
        "email",
        connexion.email
    );
    if (!account) return res.status(400).send({ erreur: "Email Invalide" });

     // ON DOIT COMPARER LES HASH
    // const passwordIsValid = await bcrypt.compare(req.body.password, account.password);
    var passwordIsValid=false
    if(account.password == connexion.password) passwordIsValid =true;
    if (!passwordIsValid)
        return res.status(400).send({ erreur: "Mot de Passe Invalide" });

    //ON RETOURNE UN JWT
    const token = jwt.sign({ id }, JWT_SECRET_KEY);
    res.header("x-auth-token", token).status(200).send({ name: account.name, token : token });
})
app.get('/courses', [authGuard], (req, res) => {
    // Rémi token : 
    // http :3000/courses "x-auth-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUxODQ2MjE0fQ.qqCQ_o2q8HEmHn9AMjL853al2rIzIbhP08gs1glHOP4"
    
    const user = Accounts.get(req.user.id)
    const courses = Courses.getUserCourses(user)
  
    res.status(200).send({courses : courses});
})

app.listen(3000)