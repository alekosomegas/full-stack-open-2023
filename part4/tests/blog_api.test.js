const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  }, 10000 );

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2NGVhMjI0YWVmOWFkYjk4NDI0OGJiODYiLCJpYXQiOjE2OTMwNzI5NDR9.8bMZ-bipc6u43EIT2GzP84dxuUag74Cj8FsCIR91mSo')
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 10000);

  test("all blogs are returned", async () => {
    const response = await 
    api.get("/api/blogs")
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2NGVhMjI0YWVmOWFkYjk4NDI0OGJiODYiLCJpYXQiOjE2OTMwNzI5NDR9.8bMZ-bipc6u43EIT2GzP84dxuUag74Cj8FsCIR91mSo')
    
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  }, 10000);

  test("blog post has id property", async () => {
    const response = await api.get("/api/blogs")
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2NGVhMjI0YWVmOWFkYjk4NDI0OGJiODYiLCJpYXQiOjE2OTMwNzI5NDR9.8bMZ-bipc6u43EIT2GzP84dxuUag74Cj8FsCIR91mSo')

    response.body.map((blog) => expect(blog.id).toBeDefined);
  }, 10000);

  test("saves correct blog", async () => {
    const newBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2NGVhMjI0YWVmOWFkYjk4NDI0OGJiODYiLCJpYXQiOjE2OTMwNzI5NDR9.8bMZ-bipc6u43EIT2GzP84dxuUag74Cj8FsCIR91mSo')
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsInDb = await helper.blogsInDb();
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1);

    expect(
      blogsInDb.filter((blog) => {
        return helper.checkBlogsAreTheSame(newBlog, blog);
      })
    ).toHaveLength(1);
  }, 10000);

  test("missing like property defaults to 0", async () => {
    const newBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    };

    await api
      .post("/api/blogs")
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2NGVhMjI0YWVmOWFkYjk4NDI0OGJiODYiLCJpYXQiOjE2OTMwNzI5NDR9.8bMZ-bipc6u43EIT2GzP84dxuUag74Cj8FsCIR91mSo')
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsInDb = await helper.blogsInDb();
    const savedBlog = blogsInDb.find((blog) => {
      return (
        blog.title === newBlog.title &&
        blog.author === newBlog.author &&
        blog.url === newBlog.url
      );
    });

    expect(savedBlog.likes).toBe(0);
  }, 10000);

  test("missing url gives status 400", async () => {
    const newBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
    };

    await api
        .post("/api/blogs")
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2NGVhMjI0YWVmOWFkYjk4NDI0OGJiODYiLCJpYXQiOjE2OTMwNzI5NDR9.8bMZ-bipc6u43EIT2GzP84dxuUag74Cj8FsCIR91mSo')
        .send(newBlog)
        .expect(400);
  }, 10000);

  test("delete a blog", async () => {
    const blogsInDb = await helper.blogsInDb();
    const blogToDelete = blogsInDb[0];
    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2NGVhMjI0YWVmOWFkYjk4NDI0OGJiODYiLCJpYXQiOjE2OTMwNzI5NDR9.8bMZ-bipc6u43EIT2GzP84dxuUag74Cj8FsCIR91mSo')
    .expect(204);

    const blogsInDbAfter = await helper.blogsInDb()
    expect(blogsInDbAfter).toHaveLength(blogsInDb.length -1)
  }, 10000);

  test('update a blog', async () => {
    const blogsInDbBefore = await helper.blogsInDb()
    const blogToUpdate = blogsInDbBefore[0]
    updatedBlog = {...blogToUpdate, likes: blogToUpdate.likes + 1}
    await api
        .put(`/api/blogs/${updatedBlog.id}`)
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2NGVhMjI0YWVmOWFkYjk4NDI0OGJiODYiLCJpYXQiOjE2OTMwNzI5NDR9.8bMZ-bipc6u43EIT2GzP84dxuUag74Cj8FsCIR91mSo')
        .send(updatedBlog)

    const blogsInDbAfter = await helper.blogsInDb()
    expect(blogsInDbAfter[0].likes).toEqual(blogToUpdate.likes +1)
  }, 10000)
});

afterAll(async () => {
  await mongoose.connection.close();
});
