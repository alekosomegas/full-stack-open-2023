const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch (error) {
        next(error)
    }
})

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    if(blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    await Blog.findOneAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    try {
        const savedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true})
        response.json(savedBlog)
    } catch (error) {
        next(error)
    }
})
module.exports = blogsRouter