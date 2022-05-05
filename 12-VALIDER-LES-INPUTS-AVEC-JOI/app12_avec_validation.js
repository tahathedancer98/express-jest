const Joi = require("joi")

schema = Joi.object({
    name: Joi.string().min(2).max(50).required()
})

console.log(schema.validate({
    nom:"Leo"
}))
console.log(schema.validate({
    name:"Leo"
}))
console.log(schema.validate({
    name:"Leo",
    first_name : "popo"
}))