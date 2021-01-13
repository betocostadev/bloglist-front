import React from 'react'
import { loginUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import LoginForm from '../components/LoginForm'

const Login = () => {
  const dispatch = useDispatch()

  const handleLogin = async ({ username, password }) => {
    dispatch(loginUser({ username, password }))
  }
  return (
    <div>
      <h2>Blog App</h2>
      <h3>Log into application</h3>
      <LoginForm loginHandler={handleLogin} />
    </div>
  )
}

export default Login
