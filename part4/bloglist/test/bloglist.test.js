const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const listHelper = require('../utils/list_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObject = listHelper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObject.map(blog => blog.save());
  await Promise.all(promiseArray);
});

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('number of correct blogs', async () => {
    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, listHelper.initialBlogs.length);
  });

  test('blogs have id property', async () => {
    const response = await api.get('/api/blogs');
    response.body.forEach(blog => {
      assert.ok(blog.id);
      assert.strictEqual(blog._id, undefined);
    });
  });
});

describe('POST /api/blogs', () => {
  test('a new blog is added', async () => {
    const newBlog = {
      title: 'A Guide to HTML',
      author: 'John Smith',
      url: 'https://example.com/node-guide',
      likes: 20
    };
    await api.post('/api/blogs').send(newBlog);
    const response = await api.get('/api/blogs');
    const titles = response.body.map(blog => blog.title);
    assert.ok(titles.includes(newBlog.title));
    assert.strictEqual(response.body.length, listHelper.initialBlogs.length + 1);
  });

  test('a new blog without likes defaults to 0', async () => {
    const newBlog = {
      title: 'New Blog Without Likes',
      author: 'Author Name',
      url: 'http://example.com'
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const createdBlog = response.body;
    assert.strictEqual(createdBlog.likes, 0);
  });

  test('a new blog with missing fields returns 400', async () => {
    const newBlog = {
      author: 'Author Name',
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });
});

describe('Invalid ID handling', () => {


  test('DELETE /api/blogs/:id with invalid ID returns 400', async () => {
    await api
      .delete('/api/blogs/i66c49e9deaa9047ea15ea973')
      .expect(400);
  });

  test('update likes', async () => {
    await api.put('/api/blogs/66d4a428c1268701f45784ac').send({ likes: 2 }).expect(200);
  });
});

after(async () => {
  await mongoose.connection.close();
});
