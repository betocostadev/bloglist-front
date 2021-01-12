import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Redirect, Link, useHistory
} from 'react-router-dom'

import Login from './components/Login'
import Notification from './components/Notification'
import Bloglist from './components/BlogList'
import Users from './components/Users'

import { useDispatch, useSelector } from 'react-redux'
import  { initializeBlogs } from './reducers/blogsReducer'
import { loginUser, logoutUser, setUser } from './reducers/userReducer'


const App = () => {
  let history = useHistory()

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUser())
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogin = async ({ username, password }) => {
    dispatch(loginUser({ username, password }))
    routeHome(history)
  }

  const handleLogout = () => {
    dispatch(logoutUser(user))
  }

  const routeHome = (props) => {
    console.log(props)
    console.log(user)
  }

  return (
    <Router>
      <Notification />
      <div>
        <Link style={{padding: '5px'}} to="/">home</Link>
        <Link style={{padding: '5px'}} to="/users">users</Link>
      </div>

      <Switch>
        <Route path="/users" render={() =>
          user
          ? <Users user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
          : <Redirect to="/login" />
        } />
        <Route path="/login">
          <Login handler={handleLogin} />
        </Route>
        <Route path="/" render={() =>
          user === null
          ? <Redirect to="/login" />
          : <Bloglist handleLogout={handleLogout} />
        } />
      </Switch>
    </Router>
  )
}

export default App
