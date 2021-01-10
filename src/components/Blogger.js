import React from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from 'react-router-dom'
import usersService from '../services/users'

const Blogger = ({users}) => {
  const id = useParams().id
  const getBlogger = async () => await usersService.getBlogger(id)
  const blogger = users ? users.find(u => u.id === id) : getBlogger()


  return (
    <div>
      {
        !blogger ?
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
