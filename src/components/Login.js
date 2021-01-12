import React from 'react'
import LoginForm from '../components/LoginForm'

const Login = ({ handler }) => {
  return (
    <div>
      <h2>Blog App</h2>
      <h3>Log into application</h3>
      <LoginForm loginHandler={handler} />
    </div>
  )
}

export default Login
