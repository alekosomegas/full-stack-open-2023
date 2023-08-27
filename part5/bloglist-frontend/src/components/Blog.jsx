import { useState } from "react"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>

      <div style={{display: showDetails ? '' : 'none'}}>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button>like</button></p>
        <p>{blog.user?.name}</p>
      </div>

    </div>  
  )
}  

export default Blog