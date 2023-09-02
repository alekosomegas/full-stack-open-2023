import { useMatch } from "react-router-dom"
import { useSelector } from "react-redux"
import { useField } from "../hooks/useField"
import { addComment } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"

const SingleBlog = () => {
    const blogs = useSelector(state => state.blogs)
    const dispatch = useDispatch()

    const match = useMatch('/blogs/:id')
    const blog = match ? blogs.find(u => u.id === match.params.id) : null

    console.log(blog);
    if (!blog) {
        return null
    }

    const comment = useField()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addComment(blog, comment.value))
        comment.onReset()
    }

    return (
        <div>
            <h2>{blog.title} {blog.author}</h2>
            <p>{blog.url}</p>
            <p>{blog.likes} likes</p>
            <p>added by {blog.user}</p>

            <h3>comments</h3>
            <form onSubmit={handleSubmit}>
                <input {...comment}/>
                <button type="submit">add comment</button>
            </form>
            <ul>
                {blog.comments?.map((b,i) => (
                    <li key={i}>{b}</li>
                ))}
            </ul>
        </div>
    )
}

export default SingleBlog