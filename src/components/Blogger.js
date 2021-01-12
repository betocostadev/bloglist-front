import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'
// import usersService from '../services/users'

const Blogger = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    if (users.length) {
      return
    } else {
      dispatch(initializeUsers())
    }
  }, [dispatch, users.length])

  const blogger = users.find(u => u.id === id)

  return (
    <div>
      {
        !blogger || !blogger.blogs ?
        <div>
          <p>Loading...</p>
        </div>
        :
        <div>
          <h2>{blogger.name}</h2>
          <h4>Added blogs</h4>
          <ul>
            {
              blogger.blogs.map(b => <li key={b.id}><Link to={`/blogs/${b.id}`}>{b.title}</Link></li>)
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default Blogger
