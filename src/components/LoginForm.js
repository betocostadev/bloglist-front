import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './LoginForm.css'

const LoginForm = ({ loginHandler }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = event => {
    event.target.name === 'username-input'
      ? setUsername(event.target.value)
      : setPassword(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    loginHandler(({ username, password }))
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username-input">Username:</label>
        <input
          className="login-input"
          id="username-input"
          type="text"
          value={username}
          name="username-input"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password-input">Password:</label>
        <input
          className="login-input"
          id="password-input"
          type="password"
          value={password}
          name="password-input"
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={!username.length || !password.length}>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  loginHandler: PropTypes.func.isRequired
}

export default LoginForm
