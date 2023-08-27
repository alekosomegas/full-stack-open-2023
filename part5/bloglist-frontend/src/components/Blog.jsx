import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>

      <div style={{display: showDetails ? '' : 'none'}}>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={handleLikeClicked}>like</button></p>
        <p>{blog.user?.name}</p>
      </div>

    </div>  
  )
}  

export default Blog