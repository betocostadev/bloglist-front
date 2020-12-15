import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Bloglist from './components/BlogList'

import { useDispatch } from 'react-redux'
import  { initializeBlogs } from './reducers/blogsReducer'
import { notificationToggle } from './reducers/notificationReducer'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()


  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => {
        return b.likes - a.likes
      })

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

  const createBlog = async (blogObject) => {
    try {
      let newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      dispatch(notificationToggle(`A new blog ${newBlog.title} by ${newBlog.author} added`, 'success', 3.8))
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      console.log(error)
      dispatch(notificationToggle(`Error adding a new blog`, 'error', 3.8))
    }
  }

  const addLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const likedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      let returnedBlog = await blogService.addLike(id, likedBlog)
      if (returnedBlog) {
        let updatedBlogs = blogs
          .map(blog => blog.id !== id ? blog : likedBlog)
          .sort((a, b) => {
            return b.likes - a.likes
          })
        setBlogs(updatedBlogs)
      }

    } catch (error) {
      console.log(error)
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

  const blogFormRef = useRef()

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
            <h2>blogs</h2>
            <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
            <Togglable buttonLabel="new-blog" ref={blogFormRef}>
              <BlogForm createBlog={createBlog} />
            </Togglable>

            { blogs.map(blog =>
              <Blog key={blog.id} blog={blog} addLike={() => addLike(blog.id)} remove={() => removeBlog(blog.id)} user={user} />
            )}

            <h3>The other bloglist</h3>
            <Bloglist removeBlog={removeBlog} addLike={addLike} user={user} />
          </div>


      }
    </div>
  )
}

export default App
