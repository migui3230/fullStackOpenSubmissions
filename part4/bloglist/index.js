require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");

const mongoUrl = process.env.MONGODB_URL;
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors());
app.use(express.json());
app.use(blogsRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
