import React, { useState, useEffect } from 'react'
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
  const [loading, setLoading] = useState(true)

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUser())
    dispatch(initializeBlogs())
    setLoading(false)
  }, [dispatch])

  let history = useHistory()
  const goHome = (props) => {
    console.log(history)
    console.log(props)
    history.push('/')
  }

  const handleLogin = async ({ username, password }) => {
    dispatch(loginUser({ username, password }))
    goHome()
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

      {
        loading ? <div>Loading...</div>
        :
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
      }
    </Router>
  )
}

export default App
