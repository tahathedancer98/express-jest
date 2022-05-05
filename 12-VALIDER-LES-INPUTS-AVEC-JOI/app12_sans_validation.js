const express = require("express");
const Joi = require("joi");
const db = require("../db");
const app = express();

app.use(express.json()); // inclure le parsing des objets qui arrivent en JSON

app.post("/names", (req, res) => {
  const payload = req.body;
  //validation avec Joi
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
  });
  const { error, value } = schema.validate(payload);
  if (error) res.status(400).json(error.details[0].message);

  db.insertOne(value);
  console.log(db.getAll());
  // Renvoyer l'objet créé
  res.status(201).json(value);
});

app.get("/names", (req, res) => {
  console.log(db.getAll());
  res.status(200).json(db.getAll());
});

app.listen(3000);
