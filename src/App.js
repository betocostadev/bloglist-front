import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Bloglist from './components/BlogList'

import { useDispatch } from 'react-redux'
import  { initializeBlogs } from './reducers/blogsReducer'
import { notificationToggle } from './reducers/notificationReducer'


const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()


  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      dispatch(notificationToggle(`Welcome ${user.username}`, 'success', 3.8))
    } catch (error) {
      console.log(error)
      dispatch(notificationToggle('Error: Wrong username or password', 'error', 3.8))
    }
  }

  const handleLogout = () => {
    dispatch(notificationToggle(`Bye bye ${user.username}`, 'success', 3.8))
    setUser(null)

    const storedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (storedUser) {
      window.localStorage.removeItem('loggedBlogAppUser')
    }
  }

  const removeBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)
    try {
      let deletedBlog = await blogService.remove(id)
      console.log('deleted blog', deletedBlog)
      let updatedBlogs = blogs
        .filter(blog => blog.id !== id)
        .sort((a, b) => {
          return b.likes - a.likes
        })
      setBlogs(updatedBlogs)
      dispatch(notificationToggle(`Blog removed`, 'success', 3.8))

    } catch (error) {
      console.log(error)
      dispatch(notificationToggle(`Error removing ${blog.title}`, 'error', 3.8))
    }
  }

  return (
    <div>
      <Notification />
      {
        user === null
          ?
          <div>
            <h3>Log into application</h3>
            <LoginForm loginHandler={handleLogin} />
          </div>
          :
          <div>
            <Bloglist handleLogout={handleLogout} removeBlog={removeBlog} user={user} />
          </div>
      }
    </div>
  )
}

export default App
