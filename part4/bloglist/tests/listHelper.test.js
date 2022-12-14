const listHelper = require("../utils/list_helper");
const totalLikes = require("../utils/list_helper").totalLikes;
const favoriteBlog = require("../utils/list_helper").favoriteBlog;
const mostBlogs = require("../utils/list_helper").mostBlogs;
const mostLikes = require("../utils/list_helper").mostLikes;

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

// TODO: create tests for each description in the problem

describe("total likes", () => {
  const multipleLists = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];

  const oneList = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
  ];

  const noList = [];

  test("test multiple blog posts", () => {
    const result = listHelper.totalLikes(multipleLists);
    expect(result).toBe(36);
  });

  test("test one blog post", () => {
    const result = listHelper.totalLikes(oneList);
    expect(result).toBe(7);
  });

  test("test no blog posts", () => {
    const result = listHelper.totalLikes(noList);
    expect(result).toBe(0);
  });
});

describe("favorite blog", () => {
  const multiplePosts = [
    {
      title: "Voluptates sint asperiores",
      author: "Madyson Osinski",
      likes: 41,
    },
    { title: "Sit quae dicta", author: "Aleah Zboncak", likes: 55 },
    { title: "Qui et consequatur", author: "Everette Bahringer", likes: 73 },
    { title: "Eos voluptates eum", author: "Nina Nikolaus", likes: 33 },
    { title: "Sint ipsam quia", author: "Jazmyn Jacobi", likes: 25 },
  ];

  const postsWithSameNumberOfLikes = [
    {
      title: "Voluptates sint asperiores",
      author: "Madyson Osinski",
      likes: 41,
    },
    { title: "Sit quae dicta", author: "Aleah Zboncak", likes: 41 },
    { title: "Qui et consequatur", author: "Everette Bahringer", likes: 41 },
  ];

  const singlePost = [
    {
      title: "Voluptates sint asperiores",
      author: "Madyson Osinski",
      likes: 41,
    },
  ];

  const noPosts = [];

  test("test multiple posts", () => {
    const result = favoriteBlog(multiplePosts);
    expect(result).toBe(multiplePosts[2]);
  });

  test("test single posts", () => {
    const result = favoriteBlog(singlePost);
    expect(result).toBe(singlePost[0]);
  });

  test("test no posts", () => {
    const result = favoriteBlog(noPosts);
    expect(result).toBe(null);
  });

  test("test posts with same number of likes", () => {
    const result = favoriteBlog(postsWithSameNumberOfLikes);
    expect(result).toEqual({
      title: expect.any(String),
      author: expect.any(String),
      likes: expect.any(Number),
    });
  });
});

describe("mostBlogs", () => {
  const multipleAuthors = [
    { author: "John Doe", blogs: 12 },
    { author: "Jane Smith", blogs: 15 },
    { author: "Bob Johnson", blogs: 10 },
    { author: "Emily Davis", blogs: 8 },
    { author: "Michael Brown", blogs: 11 },
    { author: "Sarah Wilson", blogs: 9 },
  ];

  const singleAuthor = [{ author: "John Doe", blogs: 12 }];

  const authorsWithSameBlogs = [
    { author: "John Doe", blogs: 12 },
    { author: "Jane Smith", blogs: 12 },
    { author: "Bob Johnson", blogs: 12 },
    { author: "Emily Davis", blogs: 12 },
  ];

  const noAuthors = [];

  test("test multiple authors", () => {
    const result = mostBlogs(multipleAuthors);
    expect(result).toEqual(multipleAuthors[1]);
  });

  test("test one author", () => {
    const result = mostBlogs(singleAuthor);
    expect(result).toEqual(singleAuthor[0]);
  });

  test("test no author", () => {
    const result = mostBlogs(noAuthors);
    expect(result).toEqual(null);
  });

  test("test authors with the same likes", () => {
    const result = mostBlogs(authorsWithSameBlogs);
    expect(result).toEqual({
      author: expect.any(String),
      blogs: expect.any(Number),
    });
  });
});

describe("mostLikes", () => {
  const multipleBlogs = [
    { author: "John Doe", likes: 12 },
    { author: "Jane Smith", likes: 15 },
    { author: "Bob Johnson", likes: 10 },
    { author: "Emily Davis", likes: 8 },
    { author: "Michael Brown", likes: 11 },
    { author: "Sarah Wilson", likes: 9 },
  ];

  const singleBlog = [{ author: "John Doe", likes: 12 }];

  const noBlogs = [];

  const blogsWithSameLikes = [
    { author: "John Doe", likes: 12 },
    { author: "Jane Smith", likes: 12 },
    { author: "Bob Johnson", likes: 12 },
  ];

  test("test multiple blogs", () => {
    const result = mostLikes(multipleBlogs);
    expect(result).toBe(multipleBlogs[1]);
  });

  test("test single blogs", () => {
    const result = mostLikes(singleBlog);
    expect(result).toBe(singleBlog[0]);
  });

  test("test no blog", () => {
    const result = mostLikes(noBlogs);
    expect(result).toBe(null);
  });

  test("test blog with same likes", () => {
    const result = mostLikes(blogsWithSameLikes);
    expect(result).toEqual({
      author: expect.any(String),
      likes: expect.any(Number),
    });
  });
});
