import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

      setNotificationType('success')
      setNotification(`Welcome ${user.username}`)
      clearNotification()
      setUsername('')
      setPassword('')

    } catch (error) {

      console.log(error)
      setUsername('')
      setPassword('')
      setNotificationType('error')
      setNotification(`Error: Wrong or password incorrect`)
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

  const addBlog = async (e) => {
    e.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      let newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNotification(`A new blog ${newTitle} by ${newAuthor} added`)
      setNotificationType('success')

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      clearNotification()

    } catch (error) {

      console.log(error)
      setNotification('Error adding a new blog')
      setNotificationType('error')
      clearNotification()
    }
  }

  const handleBlogChange = (e) => {
    const { name, value } = e.target
    name === 'title'
    ? setNewTitle(value)
    : name === 'author'
    ? setNewAuthor(value)
    : setNewUrl(value)
  }

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
        <LoginForm loginHandler={handleLogin} user={username} pass={password} setUser={(e) => setUsername(e.target.value)} setPass={(e) => setPassword(e.target.value)} />
      </div>
      :
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
        <BlogForm blogHandler={handleBlogChange} addBlog={addBlog} newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl} />
        { blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    }
    </div>
  )
}

export default App
