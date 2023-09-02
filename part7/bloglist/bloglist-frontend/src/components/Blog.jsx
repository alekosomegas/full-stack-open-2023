import { useState } from "react"
import { useDispatch } from "react-redux"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeClicked = async () => {
    dispatch(likeBlog(blog))
  }

  const handleRemoveClicked = async () => {
    const confirmation = confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (confirmation) {
      dispatch(deleteBlog(blog))
    }
  }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      <button id="showExtraBtn" onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>

      <div id='extraInfo' style={{display: showDetails ? '' : 'none'}}>
        <p>{blog.url}</p>
        <p>likes<span id="likes">{blog.likes}</span> <button id="likeBtn" onClick={handleLikeClicked}>like</button></p>
        <p>{blog.user?.name}</p>
        { blog.user?.username === user.username &&
          <button id="removeBtn" onClick={handleRemoveClicked}>remove</button>
        }
      </div>

    </div>  
  )
}  

export default Blog