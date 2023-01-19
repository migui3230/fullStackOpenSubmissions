const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.post("/api/users", async (request, response) => {
  const { username, password, name } = request.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // create a user
  const user = new User({
    username: username,
    password: hashedPassword,
    name: name,
  });
  // save the user to the database
  try {
    await user.save();
    return response.status(200).json(user);
  } catch (error) {
    return response.status(400).send({ error: error.message });
  }
});

usersRouter.get("/api/users", async (request, response) => {
  try {
    const allUsers = await User.find().exec();
    return response.status(200).json(allUsers);
  } catch (error) {
    return response.status(500).send({ error: error.message });
  }
});

module.exports = usersRouter;
