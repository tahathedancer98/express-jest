const express = require('express')
const app = express()


app.get('/:arg1/blala/:arg2', (req, res)=>{
    console.log(req.params)
    res.send(req.params)
})

app.listen(3000)