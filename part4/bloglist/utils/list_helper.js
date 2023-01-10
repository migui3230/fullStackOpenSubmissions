const dummy = (blogs) => {
  return 1;
};

// TODO: change this function to parse through the array of blog objects instead
const totalLike = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

module.exports = {
  dummy,
  totalLike,
};
