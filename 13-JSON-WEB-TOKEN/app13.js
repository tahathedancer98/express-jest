var jwt = require('jsonwebtoken');
require('dotenv').config()
var token = jwt.sign({ userID: 12 }, process.env.SECRET_JWT);
console.log(token);

const decoded = jwt.verify(token, process.env.SECRET_JWT)
console.log(decoded) 

try {
    const notdecoded = jwt.verify(token, "Pas_le_bon_secret")
} catch (exc) {
    console.log("Pas la bonne signature");
}

