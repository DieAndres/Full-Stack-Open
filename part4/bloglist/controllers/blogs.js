const Blog = require('../models/blog');
const blogsRouter = require('express').Router();
require('express-async-errors');
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body;
  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true, runValidators: true, context: 'query' });
  response.json(updateBlog);
});

module.exports = blogsRouter;