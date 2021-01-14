import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input, InputLabel, FormControl, Button} from '@material-ui/core'
import PostAddIcon from '@material-ui/icons/PostAdd';
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
    <div>
      <p><strong>Add a blog </strong><PostAddIcon style={{verticalAlign: 'bottom'}}/></p>
      <form onSubmit={addBlog} className="blog-form">
        <FormControl>
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input
            id="title"
            name="title"
            required type="text" value={newTitle} onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="author">Author</InputLabel>
          <Input
            id="author"
            name="author"
            required type="text" value={newAuthor} onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="url">URL</InputLabel>
          <Input
            id="url"
            name="url"
            required type="text" value={newUrl} onChange={handleChange}
          />
        </FormControl>
        <Button variant="contained" color="primary" type="submit" disabled={!newTitle.length || !newAuthor.length}>Add blog</Button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
