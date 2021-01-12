import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import  { initializeBlogs, addLike, removeBlog } from '../reducers/blogsReducer'
import {
  useHistory
} from 'react-router-dom'

const BlogPage = ({ user }) => {
  const [confirmRemove, setConfirmRemove] = useState(false)

  let history = useHistory()

  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('running - blogs effect')
    if (blogs.length) {
      return
    } else dispatch(initializeBlogs())
  }, [dispatch, blogs.length])

  const like = id => {
    const blog = blogs.find(b => b.id === id)
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      dispatch(addLike(likedBlog))
    } catch (error) {
      console.log(error)
    }
  }

  const remove = id => {
    const blog = blogs.find(b => b.id === id)
    try {
      dispatch(removeBlog(blog))
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemove = (id) => {
    setTimeout(() => {
      setConfirmRemove(false)
    }, 500)
    remove(id)
    history.push('/')
  }


  const blog = blogs.find(b => b.id === id)
  return (
    <div>
    {
      !confirmRemove
        ? null
        : <div className='remove-confirmation'>
          <div className='remove-confirmation-dialog'>
            <p>Do you really want to remove {blog.title} by {blog.author}?</p>
            <div>
              <button onClick={() => setConfirmRemove(false)}>Cancel</button>
              <button onClick={() => handleRemove(blog.id)}>Remove</button>
            </div>
          </div>
        </div>
    }
    {
      blog ?
      <div>
        <h3>Blog app</h3>
        <h2>{blog.title} by {blog.author}</h2>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">Read it!</a>
        <p className='blog-item' id="likes">
        likes {blog.likes} <button onClick={() => like(blog.id)}>like</button>
        </p>
        <p className='blog-item'>{blog.user && blog.user.name ? blog.user.name : 'anonymous'}</p>
            {
              user && blog.user ?
              user.name === blog.user.name ?
                <button onClick={() => setConfirmRemove(true)}>remove</button>
                : null
              : null
            }
      </div>
      : null
    }
    </div>
  )
}

export default BlogPage
