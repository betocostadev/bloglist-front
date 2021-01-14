import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import  { initializeBlogs, createComment, addLike, removeBlog } from '../reducers/blogsReducer'
import { useHistory, Link } from 'react-router-dom'

import { Input, InputLabel, InputAdornment, FormControl, Button,
  Card, CardContent, Typography, CardActions } from '@material-ui/core'
import InsertCommentIcon from '@material-ui/icons/InsertComment'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'

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

  const authorLink = {
    textDecoration: 'none',
    color: '#3840a5',
    fontWeight: 'bold'
  }


  const blog = blogs.find(b => b.id === id)
  return (
    <div>
    {
      !confirmRemove
        ? null
        : <div className='remove-confirmation'>
          <div className='remove-confirmation-dialog'>
          <Typography variant="body1" component="p">
            Do you really want to remove {blog.title} by {blog.author}?
          </Typography>
            <div>
              <Button variant="outlined" color="primary" onClick={() => setConfirmRemove(false)}>Cancel</Button>
              <Button variant="outlined" color="secondary" onClick={() => handleRemove(blog.id)}>Remove</Button>
            </div>
          </div>
        </div>
    }
    {
      blog ?
      <div>
      <Card>
      <CardContent>
        <Typography color="textSecondary" component="h2" gutterBottom>
        {blog.title} by {blog.author}
        </Typography>
        <Typography variant="body1" component="p">
          likes <strong>{blog.likes}</strong>
          <Button style={{ marginLeft: '0.75rem'}} size="small" variant="text" color="primary" onClick={() => like(blog.id)}><ThumbUpIcon color="primary" fontSize="small" /></Button>
        </Typography>
        <div>
        <Typography variant="body2" component="p">
          { blog.user && blog.user.name ? <Link style={authorLink} to={`/users/${blog.user.id}`}>{blog.user.name}</Link> : 'anonymous' }
        </Typography>
        {
          user && blog.user ?
          user.name === blog.user.name ?
            <Button size="small" variant="contained" color="secondary" onClick={() => setConfirmRemove(true)}>remove</Button>
            : null
          : null
        }
        </div>
      </CardContent>
      <CardActions>
        <Button component="a" href={blog.url} target="_blank" rel="noopener noreferrer">Read the blog</Button>
      </CardActions>
    </Card>
        <div>
          <h4>Comments</h4>
          <form onSubmit={addComment}>
            <FormControl>
              <InputLabel htmlFor="comment">Comment</InputLabel>
              <Input
                id="comment"
                name="comment"
                required type="text" value={newComment} onChange={handleCommentChange}
                startAdornment={
                  <InputAdornment position="start">
                    <InsertCommentIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button style={{ verticalAlign: 'bottom' }} size="small" variant="contained" color="primary" type="submit" disabled={!newComment.length}>Add</Button>
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
// <h2>{blog.title} by {blog.author}</h2>
//         <div>

//           <p className='blog-item' id="likes">
//           likes {blog.likes} <button onClick={() => like(blog.id)}>like</button>
//           </p>
//           <p className='blog-item'>{blog.user && blog.user.name ? <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link> : 'anonymous'}</p>
//               {
//                 user && blog.user ?
//                 user.name === blog.user.name ?
//                   <button onClick={() => setConfirmRemove(true)}>remove</button>
//                   : null
//                 : null
//               }
//         </div>
