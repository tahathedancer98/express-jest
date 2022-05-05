var jwt = require('jsonwebtoken');
const SECRECT_CODE = "MY_JWT_SECRET"

var token = jwt.sign({ userID: 12 }, SECRECT_CODE);
console.log(token);

const decoded = jwt.verify(token, SECRECT_CODE)
console.log(decoded)

try {
    const notdecoded = jwt.verify(token, "Pas_le_bon_secret")
} catch (exc) {
    console.log("Pas la bonne signature");
}

