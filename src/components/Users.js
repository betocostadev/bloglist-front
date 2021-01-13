import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const Users = ({ user, handleLogout }) => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <div>
        <h2>Blog App</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
      </div>

      <div>
        <h2>Users</h2>
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
