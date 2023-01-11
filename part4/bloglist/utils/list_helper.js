const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  return blogs.reduce((prev, curr) => (prev.likes > curr.likes ? prev : curr));
};

const mostBlogs = (blogs) => {
  // TODO: write case for multiple blogs
  // TODO: write case for one blog
  // TODO: write case for authors with same amount of blogs

  if (blogs.length === 0) {
    return null;
  }

  let topAuthor = blogs[0];
  blogs.reduce((prev, curr) => {
    if (curr.blogs > prev.blogs) {
      topAuthor.author = curr.author;
      topAuthor.blogs = curr.blogs;
    }
    return topAuthor;
  }, topAuthor);

  return topAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
