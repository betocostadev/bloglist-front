import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import  { initializeBlogs, createComment, addLike, removeBlog } from '../reducers/blogsReducer'
import { useHistory, Link } from 'react-router-dom'

const BlogPage = ({ user }) => {
  const [confirmRemove, setConfirmRemove] = useState(false)
  const [newComment, setNewComment] = useState('')

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

  const handleCommentChange = event => {
    const comment = event.target.value
    setNewComment(comment)
  }

  const addComment = (event) => {
    event.preventDefault()
    dispatch(createComment({ comment: newComment }, blog))
    setNewComment('')
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
        <div>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">Read it!</a>
          <p className='blog-item' id="likes">
          likes {blog.likes} <button onClick={() => like(blog.id)}>like</button>
          </p>
          <p className='blog-item'>{blog.user && blog.user.name ? <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link> : 'anonymous'}</p>
              {
                user && blog.user ?
                user.name === blog.user.name ?
                  <button onClick={() => setConfirmRemove(true)}>remove</button>
                  : null
                : null
              }
        </div>

        <div>
          <h4>Comments</h4>
          <form onSubmit={addComment} className="blog-form">
            <div>
              <label htmlFor="comment">Comment:</label>
              <input
                name="comment"
                value={newComment}
                onChange={handleCommentChange}
              />
              <button type="submit">Add Comment</button>
            </div>
          </form>
          { blog.comments && blog.comments.length
            ? <ul>
                { blog.comments.map(c =><li key={c.id}>{c.comment}</li>) }
              </ul>
            : null
          }
        </div>
      </div>
      : null
    }
    </div>
  )
}

export default BlogPage
