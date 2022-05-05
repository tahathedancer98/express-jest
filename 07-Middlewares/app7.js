const express = require('express')
const app = express()

// définition du middlewares
function Middleware1(req, res, next){
    console.log('Middleware 1')
    next()
}
function Middleware2(req, res, next){
    console.log('Middleware 2')
    next()
}
function Middleware3(req, res, next){
    console.log('Middleware 3')
    next()
}

app.use(Middleware1)
app.use(Middleware3)
app.use(Middleware2)

app.get('/', (req, res)=>{
    res.send(req.url)
})

app.listen(3000)