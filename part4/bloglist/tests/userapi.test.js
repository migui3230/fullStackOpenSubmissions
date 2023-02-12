const User = require("../models/user");
const request = require("supertest");
const app = require("../index");

test("app returns correct amount of users in the json format", async () => {
  const response = await request(app)
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(1);
}, 100000);

// create an invalid user that doesn't have a username and check for the status code and error message
test("create an invalid user that doesn't have a username", async () => {
  const newUser = {
    name: "Test User",
    password: "password",
  };

  const response = await request(app)
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(response.body.error).toContain("Missing username, password or name");
  expect(response.statusCode).toBe(400);
}, 100000);

// create a user with a username of 'exampleusername' and check for the status code and error message
test("create an invalid user with a username of 'exampleusername'", async () => {
  const newUser = {
    username: "exampleusername",
    name: "Test User",
    password: "password",
  };

  const response = await request(app)
    .post("/api/users")
    .send(newUser)
    .expect("Content-Type", /application\/json/);

  expect(response.statusCode).toBe(400);
  expect(response.body.error).toContain("Username already exists");
}, 100000);

// create a user that has a username of less than 3 characters in length and check for the status code and error message
test("create an invalid user with a username of less than 3 characters in length", async () => {
  const newUser = {
    username: "ex",
    name: "Test User",
    password: "password",
  };

  const response = await request(app)
    .post("/api/users")
    .send(newUser)
    .expect("Content-Type", /application\/json/);

  expect(response.statusCode).toBe(400);
  expect(response.body.error).toContain(
    "Username and password must be at least 3 characters long"
  );
}, 100000);
