const totalLikes = (blogs) => {
    return blogs.reduce((acc, cur) => {return cur.likes + acc}, 0)
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(blog => blog.likes))
    const favBlog = blogs.find(blog => blog.likes === mostLikes)
    return {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes
      }
}

const mostBlogs = (blogs) => {
    const score = {}
    blogs.forEach(blog => {
        score[blog.author] = score[blog.author] ? score[blog.author] +1 : 1
    });
    const maxBlogs = Math.max(...Object.values(score))
    const author = Object.keys(score).find(key => score[key] === maxBlogs)
    return {
        author: author,
        blogs: maxBlogs
    }
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs
}