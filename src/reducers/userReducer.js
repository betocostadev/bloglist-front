import loginService from '../services/login'
import blogService from '../services/blogs'
import { notificationToggle } from '../reducers/notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'LOGIN_USER':
      return action.data
    case 'LOGOUT_USER':
      return action.data

    default:
      return state
  }
}

export const loginUser = credentials => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      dispatch({ type: 'LOGIN_USER', data: user })
      blogService.setToken(user.token)
      dispatch(notificationToggle(`Welcome ${user.name}`, 'success', 3.8))
    } catch (error) {
      console.log(error)
      dispatch(notificationToggle('Error: Wrong username or password', 'error', 3.8))
    }
  }
}

export const logoutUser = user => {
  return dispatch => {
    try {
      const storedUser = window.localStorage.getItem('loggedBlogAppUser')
      if (storedUser) {
        window.localStorage.removeItem('loggedBlogAppUser')
      }
      dispatch(notificationToggle(`Bye bye ${user.name}`, 'success', 3.8))
      dispatch({ type: 'LOGOUT_USER', data: null})
    } catch (error) {
      console.log(error)
    }
  }
}

export const setUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return dispatch => {
      dispatch({ type: 'SET_USER', data: user })
    }
  } else {
    return dispatch => {
      dispatch({ type: 'SET_USER', data: null })
    }
  }
}

export default userReducer
