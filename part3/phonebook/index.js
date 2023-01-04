require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/person");

const app = express();
const logBody = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    JSON.stringify(req.body),
  ].join(" ");
};

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(morgan(logBody));
app.use(cors());
app.use(express.static("build"));
mongoose.set("strictQuery", true);

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

app.get("/api/persons", async (req, res) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/persons/:id", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to mongo");
    const id = req.params.id;
    const objectId = mongoose.Types.ObjectId(id);
    const person = await Person.findOne({ _id: objectId });
    res.json(person);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
    console.log("connection closed");
  }
});

app.get("/info", async (req, res) => {
  try {
    const persons = await Person.find({});
    const personsLength = persons.length;
    const currentDate = new Date();
    res.send(`<p>Phonebook has info for ${personsLength} people</p>
  ${currentDate}`);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  entries = entries.filter((p) => p.id !== id);
  return res.sendStatus(204);
});

app.post("/api/persons", (req, res) => {
  const maxId = entries.length > 0 ? Math.max(...entries.map((p) => p.id)) : 0;
  const { name, number } = req.body;

  const personAlreadyExists = entries.find((person) => person.name === name);

  if (!name) {
    res.status(400).send({
      error: "Name is required",
    });
  }

  if (!number) {
    res.status(400).send({
      error: "Number is required",
    });
  }

  if (personAlreadyExists) {
    res.status(400).send({
      error: "Name must be unique",
    });
  }

  const person = {
    id: maxId + 1,
    name: name,
    number: number,
  };

  entries = entries.concat(person);
  res.json(person);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Express app on port ${PORT}`);
});
