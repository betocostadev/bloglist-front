import React, { useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { notificationToggle } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  const create = (blogObject) => {
    try {
      dispatch(createBlog(blogObject, user))
      dispatch(notificationToggle(`A new blog ${blogObject.title} by ${blogObject.author} added`, 'success', 3.8))
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      console.log(error)
      dispatch(notificationToggle(`Error adding a new blog`, 'error', 3.8))
    }
  }


  return (
    <div>
      <h2>Blog App</h2>
      <h3>blogs</h3>
      <Togglable buttonLabel="new-blog" ref={blogFormRef}>
        <BlogForm createBlog={create} />
      </Togglable>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
          { blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </TableCell>
              <TableCell>
                {blog.author}
              </TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}

export default BlogList
