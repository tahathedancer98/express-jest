// Il faut installer ces deux cmd après la création du nouveau projet : 
// npm i express
// npm i --save-dev jest supertest

const expres = require('express')
const app = expres()

// La convention c'est d'appeler notre variable app au lieu de server

app.get('/', (req, res) => {
    res.send('Hello World')
    // Il faut appeller une méthode express pour
    // terminer la requête
    // res.send le fait pour nous.
})

app.listen(3000)