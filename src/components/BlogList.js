import React, { useRef } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

import { useDispatch, useSelector } from 'react-redux'
import { notificationToggle } from '../reducers/notificationReducer'
import { createBlog, addLike, removeBlog } from '../reducers/blogsReducer'

const BlogList = ({ user, handleLogout }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()

  const create = (blogObject) => {
    try {
      dispatch(createBlog(blogObject))
      dispatch(notificationToggle(`A new blog ${blogObject.title} by ${blogObject.author} added`, 'success', 3.8))
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      console.log(error)
      dispatch(notificationToggle(`Error adding a new blog`, 'error', 3.8))
    }
  }

  const like = id => {
    const blog = blogs.find(b => b.id === id)
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      dispatch(addLike(likedBlog))
      blogs.sort((a, b) => b.likes - a.likes)
    } catch (error) {
      console.log(error)
    }
  }

  const remove = id => {
    const blog = blogs.find(b => b.id === id)
    try {
      dispatch(removeBlog(blog))
      blogs.sort((a, b) => b.likes - a.likes)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
      <Togglable buttonLabel="new-blog" ref={blogFormRef}>
        <BlogForm createBlog={create} />
      </Togglable>

      { blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} like={() => like(blog.id)} remove={() => remove(blog.id)} user={user} />
      )}
    </div>
  )
}

export default BlogList
