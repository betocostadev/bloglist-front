import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Bloglist from './components/BlogList'

import { useDispatch, useSelector } from 'react-redux'
import  { initializeBlogs } from './reducers/blogsReducer'
import { loginUser, logoutUser, setUser } from './reducers/userReducer'


const Users = () => (
  <div> <h2>Users</h2> </div>
)

const App = () => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUser())
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogin = async ({ username, password }) => {
    dispatch(loginUser({ username, password }))
  }

  const handleLogout = () => {
    dispatch(logoutUser(user))
  }

  return (
    <Router>
      <Notification />
      <div>
        <Link style={{padding: '5px'}} to="/">home</Link>
        <Link style={{padding: '5px'}} to="/users">users</Link>
      </div>

      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          {
            user === null
              ?
              <div>
                <h3>Log into application</h3>
                <LoginForm loginHandler={handleLogin} />
              </div>
              :
              <div>
                <Bloglist handleLogout={handleLogout} />
              </div>
          }
        </Route>
      </Switch>
    </Router>
  )
}

export default App
