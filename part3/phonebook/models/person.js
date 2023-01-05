const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;

mongoose.set("strictQuery", true);

const validatePhoneNumber = (value) => {
  const regex = /^\d{2,3}-\d+$/;
  if (!regex.test(value)) {
    throw new Error("Invalid phone number");
  }
  return true;
};

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// TODO: make the name stored in the db to be at least three chars long
// TODO: make the frontend display an error message when a validation error occurs
const personSchema = new mongoose.Schema({
  // name: String,
  // number: String,
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: [validatePhoneNumber, "Invalid phone number"],
  },
});

module.exports = mongoose.model("Person", personSchema);
