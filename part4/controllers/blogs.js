const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

blogsRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({}).populate("user", { name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const user = request.user;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });
  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id)
  const validUser = blog.user.toString() === user._id.toString();
  if (!validUser) {
    return response.status(401).json({ error: "not user's blog" });
  }
  await Blog.findOneAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  console.log("body", body);
  const newBlog = {
    title: body.title,
    url: body.url,
    likes: body.likes,
  };
  try {
    const savedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
      new: true,
    });
    console.log("saved", savedBlog);
    response.json(savedBlog);
  } catch (error) {
    next(error);
  }
});
module.exports = blogsRouter;
