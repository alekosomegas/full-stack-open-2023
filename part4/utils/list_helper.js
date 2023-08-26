const totalLikes = (blogs) => {
    return blogs.reduce((acc, cur) => {return cur.likes + acc}, 0)
}

module.exports = {
    totalLikes
}