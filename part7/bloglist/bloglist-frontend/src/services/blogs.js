import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (blog, blogId) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.put(`${baseUrl}/${blogId}`, blog, config )
  return response.data
}

const increaseLike = async (blog) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, {...blog, likes: blog.likes + 1}, config)
}

const addComment = async (blog, comment) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, {...blog, comments: blog.comments ? blog.comments.concat(comment) : [comment]}, config)
}
 
const remove = async (blogId) => {
  console.log(token);
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config )
  return response.data
}

export default { getAll, create, setToken, update, remove, increaseLike, addComment }