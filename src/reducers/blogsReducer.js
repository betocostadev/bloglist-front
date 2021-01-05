import blogsService from '../services/blogs'

const blogsReducer = (state = [], action) => {

  switch (action.type) {
    case 'ADD_LIKE':
      const id = action.data
      const blogToLike = state.find(b => b.id === id)
      const changedBlog = {
        ...blogToLike, likes: blogToLike.likes + 1
      }
      return state.map(blog => blog.id !== id ? blog : changedBlog)

    case 'REMOVE_BLOG':
      const removed = action.removed
      return state.filter(blog => blog.id !== removed)

    case 'ADD_BLOG':
      return [...state, action.data]

    case 'INIT_BLOGS': {
      return action.data
    }

    default:
      break
  }

  return state
}

export const addLike = blog => {
  return async dispatch => {
    const blogToLike = await blogsService.addLike(blog)
    dispatch({ type: 'ADD_LIKE', data: blogToLike.id })
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    const removedID = blog.id
    const blogToRemove = await blogsService.remove(blog.id)
    dispatch({ type: 'REMOVE_BLOG', data: blogToRemove, removed: removedID })
  }
}

export const createBlog = (content, user) => {
  return async dispatch => {
    const newBlog = await blogsService.create(content)
    newBlog.user = user
    dispatch({ type: 'ADD_BLOG', data: newBlog })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({ type: 'INIT_BLOGS', data: blogs })
  }
}

export default blogsReducer
