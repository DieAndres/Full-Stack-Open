const _ = require('lodash');

const dummy = () => {
  return 1;
};

const initialBlogs = [
  {
    title: 'Understanding JavaScript Closures',
    author: 'Jane Doe',
    url: 'https://example.com/js-closures',
    likes: 10
  },
  {
    title: 'A Guide to Node.js',
    author: 'John Smith',
    url: 'https://example.com/node-guide',
    likes: 20
  },
  {
    title: 'Mastering React',
    author: 'Alice Johnson',
    url: 'https://example.com/react-master',
    likes: 30
  },
  {
    title: 'Exploring MongoDB',
    author: 'Bob Brown',
    url: 'https://example.com/mongodb-exploration',
    likes: 15
  },
  {
    title: 'CSS Grid Layout',
    author: 'Charlie White',
    url: 'https://example.com/css-grid',
    likes: 25
  }
];

const totalLikes = (blogs) => {

  const reducer = (sum, item) => {
    console.log(item.likes);
    return sum + item.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {

  const reducer = (favorite, blog) => {
    favorite = favorite.likes <= blog.likes || favorite.likes === undefined ? blog : favorite;
    return favorite;
  };
  return blogs.reduce(reducer, {});
};

const mostBlogs = (blogs) => {
  const authorWithMostBlogs = _(blogs)
    .countBy('author')
    .toPairs()
    .maxBy(_.last);

  const [author, count] = authorWithMostBlogs;
  return {
    author: author,
    blogs: count
  };

};


const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author');
  const likesByAuthor = _.map(groupedByAuthor, (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, 'likes')
  }));
  return _.maxBy(likesByAuthor, 'likes');
};
module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, initialBlogs
};