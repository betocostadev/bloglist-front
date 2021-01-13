import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Redirect, Link
} from 'react-router-dom'

import Login from './components/Login'
import Notification from './components/Notification'
import Bloglist from './components/BlogList'
import Users from './components/Users'
import Blogger from './components/Blogger'

import { useDispatch, useSelector } from 'react-redux'
import  { initializeBlogs } from './reducers/blogsReducer'
import { logoutUser, setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'


const App = () => {
  const [loading, setLoading] = useState(true)

  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    setLoading(false)
  }, [dispatch])

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

      {
        loading ? <div>Loading...</div>
        :
        <Switch>
          <Route path="/users/:id" render={() =>
            user
            ? <Blogger users={users} />
            : <Redirect to="/login" />
          } />

          <Route path="/users" render={() =>
            user
            ? <Users user={user} handleLogout={handleLogout} />
            : <Redirect to="/login" />
          } />

          <Route path="/login" render={() =>
            user
            ? <Redirect to="/" />
            : <Login />
          } />

          <Route path="/" render={() =>
            user === null
            ? <Redirect to="/login" />
            : <Bloglist handleLogout={handleLogout} />
          } />

        </Switch>
      }
    </Router>
  )
}

export default App
