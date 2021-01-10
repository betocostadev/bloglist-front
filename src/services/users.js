import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getBlogger = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default {
  getAll,
  getBlogger
}
