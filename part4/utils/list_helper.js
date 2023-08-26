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

module.exports = {
    totalLikes,
    favoriteBlog
}