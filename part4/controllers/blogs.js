const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', (request, response, next) => {
    Blog.find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => logger.error(error))
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if(blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => logger.error(error))
})

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
    blog.save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => logger.error(error))
})

module.exports = blogsRouter