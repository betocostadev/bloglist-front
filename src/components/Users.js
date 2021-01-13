import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <div>
        <h2>Blog App</h2>
        <h3>Users</h3>
        <table>
          <tbody>
          <tr>
          <th></th>
          <th>Blogs created</th>
          </tr>
            { users.map(usr =>
              <tr key={usr.id}>
                <td><Link style={{padding: '5px'}} to={`/users/${usr.id}`}>{usr.name}</Link></td>
                <td>{usr.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
