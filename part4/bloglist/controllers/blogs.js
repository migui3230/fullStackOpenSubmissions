const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.likes) {
    blog.likes = 0;
  }

  if (!blog.title || !blog.url) {
    return response.status(400).end();
  }

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

// TODO: create route to delete a single blog post resource

blogsRouter.delete("/api/blogs/:id", async (request, response) => {
  const id = request.params.id;

  try {
    const doc = await Blog.findByIdAndDelete(id);
    response.json(doc);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

module.exports = blogsRouter;
