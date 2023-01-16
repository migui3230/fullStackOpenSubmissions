const Blog = require("../models/blog");
const request = require("supertest");
const app = require("../index");

test("app returns correct amount of blog posts in the json format", async () => {
  const response = await request(app)
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(response.body.length);
}, 100000);

test("test unique identifier of the blog posts is _id", async () => {
  const response = await request(app)
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const firstPost = response.body[0];

  expect(firstPost._id).toBeDefined();
});

test("should create a new blog post", async () => {
  // TODO: expect that the length is increased by 1 compared to the initial state
  // TODO: expect that the data input into the db is included in the new state

  const initialState = await request(app)
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const initialLength = initialState.body.length;

  const data = new Blog({
    title: "blog api test",
    author: "MiggyS",
    likes: 69,
    url: "www.thisiskewl.com",
  });

  const dataObject = data.toObject();

  const postRequest = await request(app)
    .post("/api/blogs")
    .send(dataObject)
    .expect(201);

  const newState = await request(app)
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const newLength = newState.body.length;

  expect(newLength).toBe(initialLength + 1);
});
