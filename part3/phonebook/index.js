const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// TODO: set the port for the express app

const PORT = 3001;

let entries = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  // return the entries variable as json
  return res.json(entries);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const neededPerson = entries.filter((person) => person.id === id);
  console.log(neededPerson);
  if (neededPerson.length === 0) {
    return res.sendStatus(404);
  }
  res.json(neededPerson);
});

app.get("/info", (req, res) => {
  const entriesLength = entries.length;
  const currentDate = new Date();
  res.send(`<p>Phonebook has info for ${entriesLength} people</p>
  ${currentDate}`);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = entries.filter((p) => p.id !== id);
  return res.sendStatus(204);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const maxId = entries.length > 0 ? Math.max(...entries.map((p) => p.id)) : 0;

  const person = {
    id: maxId + 1,
    name: body.name,
    number: body.number,
  };

  entries = entries.concat(person);
  res.json(person);
});

app.listen(PORT, () => {
  console.log(`Express app on port ${PORT}`);
});
