const express = require('express')
const app = express()

function modifyResponseObject(req, res, next){
    res.locals.blabla = "je n'existais pas avant"
    next()
}
function modifyRequestObject(req, res, next){
    req.blabla2 = "2 je n'existais pas aussi"
    next()
}
// On a bien enrichis les objects Request & Response
function blockDeleteRequest(req, res, next){
    if(req.method == "DELETE")
    throw new Error("NO DELETE PLEASE")
    next()
}
// On peut blocker la requette DELETE en utilisant des middlewares
function blockPutRequest(req, res, next){
    if(req.method == "PUT"){
        res.status(400).send("NO PUT PLEASE") // va intérrompre la chaine de middlewares
    }else
    next()
}
// On peut blocker la requette PUT en utilisant des middlewares


app.use(modifyRequestObject)
app.use(modifyResponseObject)
app.use(blockDeleteRequest)
app.use(blockPutRequest)

app.get('/', (req, res) => {
    console.log(res.locals)
    console.log(req.blabla2)
    res.send("Hello World")
})
app.put('/', (req, res) => {
    console.log("I AM IN")
    res.send("Hello World")
})

app.listen(3000)