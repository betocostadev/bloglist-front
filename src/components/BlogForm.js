import React from 'react'
import './BlogForm.css'

const BlogForm = ({ addBlog, blogHandler, newTitle, newAuthor, newUrl }) => {
  return (
    <form onSubmit={addBlog} className="blog-form">
      <div>
        <label htmlFor="title">Title:</label>
        <input
        name="title"
        value={newTitle}
        onChange={blogHandler}
        />
      </div>

      <div>
        <label htmlFor="author">Author:</label>
        <input
        name="author"
        value={newAuthor}
        onChange={blogHandler}
        />
      </div>

      <div>
        <label htmlFor="url">URL:</label>
        <input
        name="url"
        value={newUrl}
        onChange={blogHandler}
        />
      </div>
      <button type="submit">Add Blog</button>
  </form>
  )
}

export default BlogForm
