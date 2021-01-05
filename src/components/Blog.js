import React, { useState } from 'react'
import './Blog.css'

const Blog = ({ blog, like, remove, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [confirmRemove, setConfirmRemove] = useState(false)

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }
  const buttonStyle = {
    marginLeft: '1rem'
  }

  const handleRemove = (id) => {
    setTimeout(() => {
      setConfirmRemove(false)
    }, 500)
    remove(id)
  }

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
                <button onClick={handleRemove}>Remove</button>
              </div>
            </div>
          </div>
      }
      {
        !showDetails
          ?
          <div className='blog'>
            <p className='blog-item'>{blog.title} by {blog.author}
              <button style={buttonStyle} onClick={() => setShowDetails(!showDetails)}>Show</button>
            </p>
          </div>
          :
          <div className='blog'>
            <p className='blog-item'>{blog.title} {blog.author}
              <button style={buttonStyle} onClick={() => setShowDetails(!showDetails)}>Hide</button>
            </p>
            <p className='blog-item' id="url">{blog.url}</p>
            <p className='blog-item' id="likes">
            likes {blog.likes} <button onClick={like}>like</button>
            </p>
            <p className='blog-item'>{blog.user && blog.user.name ? blog.user.name : 'anonymous'}</p>
            {
              user.name === blog.user.name ?
                <button onClick={() => setConfirmRemove(true)}>remove</button>
                : null
            }
          </div>
      }
    </div>
  )
}

export default Blog
