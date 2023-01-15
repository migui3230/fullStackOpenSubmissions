const Blog = require("../models/blog");
const request = require("supertest");
const app = require("../index");

// TODO: check this test
test("app returns correct amount of blog posts in the json format", async () => {
  const response = await request(app)
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(2);
}, 100000);

test("test unique identifier of the blog posts is _id", async () => {
  const response = await request(app)
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const firstPost = response.body[0];

  expect(firstPost._id).toBeDefined();
});
