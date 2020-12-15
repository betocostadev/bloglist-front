import React, { useRef } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

import { useDispatch, useSelector } from 'react-redux'
// import { addVote } from '../reducers/anecdoteReducer'
import { notificationToggle } from '../reducers/notificationReducer'

const BlogList = ({ user, createBlog, removeBlog, addLike, handleLogout }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
      <Togglable buttonLabel="new-blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      { blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} addLike={() => addLike(blog.id)} remove={() => removeBlog(blog.id)} user={user} />
      )}
    </div>
  )
}

export default BlogList
