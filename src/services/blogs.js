import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const addLike = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  // Already giving +1 to like and sending the blog here
  // const changedBlog = {
  //   ...blog,
  //   likes: blog.likes + 1
  // }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const createComment = async (newComment, blog) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/comments/`, newComment)
  return response.data
}

export default {
  getAll,
  create,
  createComment,
  addLike,
  remove,
  setToken
}
