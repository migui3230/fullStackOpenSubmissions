const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },

  password: {
    type: String,
    required: true,
    minLength: 3,
  },

  name: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
