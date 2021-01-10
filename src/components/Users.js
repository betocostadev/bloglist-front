import React, { useEffect } from 'react'
import LoginForm from './LoginForm'
import Blogger from './Blogger'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

const Users = ({ user, handleLogin, handleLogout }) => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <Router>
      {
        user === null
        ?
        <div>
          <h3>Log into application</h3>
          <LoginForm loginHandler={handleLogin} />
        </div>
        :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
        </div>
      }
        <Switch>
          <Route path="/users/:id">
            <Blogger users={users} />
          </Route>
          <Route path="/users">
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
          </Route>
        </Switch>
    </Router>
  )
}

export default Users
