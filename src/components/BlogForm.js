import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './BlogForm.css'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    name === 'title'
      ? setNewTitle(value)
      : name === 'author'
        ? setNewAuthor(value)
        : setNewUrl(value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }



  return (
    <form onSubmit={addBlog} className="blog-form">
      <div>
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          value={newTitle}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="author">Author:</label>
        <input
          name="author"
          value={newAuthor}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="url">URL:</label>
        <input
          name="url"
          value={newUrl}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Blog</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
