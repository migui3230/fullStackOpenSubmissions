require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/person");
const { response } = require("express");

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

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
};

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(morgan(logBody));
app.use(cors());
app.use(express.static("build"));
app.use(errorHandler);
mongoose.set("strictQuery", true);

app.get("/api/persons", async (req, res, next) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    next(error);
  }
});

app.get("/api/persons/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const objectId = mongoose.Types.ObjectId(id);
    const person = await Person.findOne({ _id: objectId });
    res.json(person);
  } catch (error) {
    next(error);
  }
});

// TODO: make sure to run validation in this endpoint too
app.put("/api/persons/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const objectId = mongoose.Types.ObjectId(id);
    const person = await Person.findOneAndUpdate(
      {
        _id: objectId,
      },
      req.body,
      { new: true, runValidators: true }
    );
    res.json(person);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error,
    });
    next(error);
  }
});

app.get("/info", async (req, res, next) => {
  try {
    const persons = await Person.find({});
    const personsLength = persons.length;
    const currentDate = new Date();
    res.send(`<p>Phonebook has info for ${personsLength} people</p>
  ${currentDate}`);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const objectId = mongoose.Types.ObjectId(id);
    await Person.deleteOne({ _id: objectId });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.post("/api/persons", async (req, res, next) => {
  try {
    const { name, number } = req.body;

    // const personAlreadyExists = await Person.findOne({ name: name });

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

    // if (personAlreadyExists) {
    //   res.status(400).send({
    //     error: "Name must be unique",
    //   });
    // }

    const person = {
      name: name,
      number: number,
    };

    const newPerson = new Person(person);
    await newPerson.save();

    res.json(person);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error,
    });
    next(error);
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Express app on port ${PORT}`);
});
