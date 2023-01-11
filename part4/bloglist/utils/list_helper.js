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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
