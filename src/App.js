import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => {
        return b.likes - a.likes
      })

      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const clearNotification = () => {
    setTimeout(() => {
      setNotification(null)
      setNotificationType(null)
    }, 4000)
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setNotificationType('success')
      setNotification(`Welcome ${user.username}`)
      clearNotification()

    } catch (error) {
      console.log(error)
      setNotificationType('error')
      setNotification('Error: Wrong or password incorrect')
      clearNotification()
    }
  }

  const handleLogout = () => {
    setNotificationType('success')
    setNotification(`Bye bye ${user.username}`)
    setUser(null)

    clearNotification()

    const storedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (storedUser) {
      window.localStorage.removeItem('loggedBlogAppUser')
    }
  }

  const createBlog = async (blogObject) => {
    try {
      let newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`)
      setNotificationType('success')
      blogFormRef.current.toggleVisibility()
      clearNotification()

    } catch (error) {
      console.log(error)
      setNotification('Error adding a new blog')
      setNotificationType('error')
      clearNotification()
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
      setNotification('Blog removed')
      setNotificationType('success')
      clearNotification()

    } catch (error) {
      console.log(error)
      setNotification(`Error removing ${blog.title}`)
      setNotificationType('error')
      clearNotification()
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      {
        notificationType === null
          ? null
          : <Notification message={notification} type={notificationType} />
      }
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
          </div>
      }
    </div>
  )
}

export default App
