const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.post("/api/users", async (request, response) => {
  const { username, password, name } = request.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  if (!username || !password || !name) {
    return response
      .status(400)
      .send({ error: "Missing username, password or name" });
  }

  // get all the users from the database
  const allUsers = await User.find().exec();
  // check if the username already exists
  const userExists = allUsers.find((user) => user.username === username);
  if (userExists) {
    return response.status(400).send({ error: "Username already exists" });
  }

  // check for username and password are at least 3 characters long
  if (username.length < 3 || password.length < 3) {
    return response.status(400).send({
      error: "Username and password must be at least 3 characters long",
    });
  }

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
