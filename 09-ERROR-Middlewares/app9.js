const express = require('express')
const app = express()

function myErrorMiddleware(err,req, res, next){
    res.status(500).json("Internal Server Error")
    next()
}

app.use(myErrorMiddleware)

app.get('/', (req, res, next) => {
    try {
        throw new Error('Ceci est un bug')
    } catch (error) {
        next(error)
    }
})

app.listen(3000)