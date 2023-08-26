const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => {
    return cur.likes + acc;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));
  const favBlog = blogs.find((blog) => blog.likes === mostLikes);
  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  const scores = {};
  blogs.forEach((blog) => {
    scores[blog.author] = scores[blog.author] ? scores[blog.author] + 1 : 1;
  });
  const maxBlogs = Math.max(...Object.values(scores));
  const author = Object.keys(scores).find((key) => scores[key] === maxBlogs);
  return {
    author: author,
    blogs: maxBlogs,
  };
};

const mostLikes = (blogs) => {
  const scores = {};
  blogs.forEach((blog) => {
    Object.keys(scores).includes(blog.author)
      ? (scores[blog.author] += blog.likes)
      : (scores[blog.author] = blog.likes);
  });
  console.log(scores);
  const maxLikes = Math.max(...Object.values(scores));
  const author = Object.keys(scores).find((key) => scores[key] === maxLikes);
  return {
    author: author,
    likes: maxLikes,
  };
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
