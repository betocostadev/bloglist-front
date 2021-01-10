import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogger } from '../reducers/bloggerReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from 'react-router-dom'
// import usersService from '../services/users'

const Blogger = () => {
  const [loaded, setLoaded] = useState(false)
  const id = useParams().id
  // const getBlogger = async () => await usersService.getBlogger(id)
  // const blogger = users ? users.find(u => u.id === id) : getBlogger()
  const blogger = useSelector(state => state.blogger)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogger(id))
  }, [dispatch])

  setTimeout(() => {
    if (blogger.blogs && blogger.blogs.length) setLoaded(true)
  }, 500)


  return (
    <div>
      {
        !loaded ?
        <div>
          <p>Loading...</p>
        </div>
        :
        <div>
          <h2>{blogger.name}</h2>
          <h4>Added blogs</h4>
          <ul>
            {
              blogger.blogs.map(b => <li key={b.id}>{b.title}</li>)
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default Blogger
