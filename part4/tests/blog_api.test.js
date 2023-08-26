const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

describe("when there is initially some notes saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  }, 100000);

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  }, 100000);

  test("blog post has id property", async () => {
    const response = await api.get("/api/blogs");
    response.body.map((blog) => expect(blog.id).toBeDefined);
  }, 100000);

  test("saves correct blog", async () => {
    const newBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
      
      const blogsInDb = await helper.blogsInDb()
      expect(blogsInDb).toHaveLength(helper.initialBlogs.length +1)
    
      expect((blogsInDb.filter(blog => {
        return helper.checkBlogsAreTheSame(newBlog, blog)
      }))).toHaveLength(1)

  }, 100000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
