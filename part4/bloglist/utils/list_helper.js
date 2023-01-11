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

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  let topBlog = blogs[0];

  blogs.reduce((prev, curr) => {
    if (curr.likes > prev.likes) {
      topBlog = curr;
    }

    return topBlog;
  }, topBlog);

  return topBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
