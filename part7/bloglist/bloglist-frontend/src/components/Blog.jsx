import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, username }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeClicked = async () => {
    const newBlog = {...blog, likes: blog.likes + 1, id: undefined, user: blog.user?.id}
    await blogService.update(newBlog, blog.id)
    setBlogs(prev => {
      prev[prev.indexOf(blog)] = {...blog, likes: blog.likes +1}
      return [
        ...prev
      ]
    })
  }

  const handleRemoveClicked = async () => {
    const confirmation = confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (confirmation) {
      try {
        await blogService.remove(blog.id)
        setBlogs(prev => prev.filter(b => b !== blog))
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button id="showExtraBtn" onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>

      <div id='extraInfo' style={{display: showDetails ? '' : 'none'}}>
        <p>{blog.url}</p>
        <p>likes<span id="likes">{blog.likes}</span> <button id="likeBtn" onClick={handleLikeClicked}>like</button></p>
        <p>{blog.user?.name}</p>
        { blog.user?.username === username &&
          <button id="removeBtn" onClick={handleRemoveClicked}>remove</button>
        }
      </div>

    </div>  
  )
}  

export default Blog