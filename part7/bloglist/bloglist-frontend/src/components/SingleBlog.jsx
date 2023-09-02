import { useMatch } from "react-router-dom"
import { useSelector } from "react-redux"

const SingleBlog = () => {
    const blogs = useSelector(state => state.blogs)

    const match = useMatch('/blogs/:id')
    const blog = match ? blogs.find(u => u.id === match.params.id) : null

    if (!blog) {
        return null
    }

    return (
        <div>
            <h2>{blog.title} {blog.author}</h2>
            <p>{blog.url}</p>
            <p>{blog.likes} likes</p>
            <p>added by {blog.user}</p>
        </div>
    )
}

export default SingleBlog