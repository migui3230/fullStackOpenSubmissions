const express = require("express");
const app = express();

// TODO: set the port for the express app

const PORT = 3001;

const entries = [
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

app.get("/info", (req, res) => {
  const entriesLength = entries.length;
  const currentDate = new Date();
  res.send(`<p>Phonebook has info for ${entriesLength} people</p>
  ${currentDate}`);
  // return html of the phonebook info
  // return html of the date
});

app.listen(PORT, () => {
  console.log(`Express app on port ${PORT}`);
});
