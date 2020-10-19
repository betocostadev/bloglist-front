import React from 'react'
import './LoginForm.css'

const LoginForm = ({ loginHandler, setUser, user, setPass, pass }) => (
  <form className="login-form" onSubmit={loginHandler}>
    <div>
      <label htmlFor="username-input">Username:</label>
      <input
        className="login-input"
        id="username-input"
        type="text"
        value={user}
        name="username-input"
        onChange={setUser}
      />
    </div>
    <div>
      <label htmlFor="password-input">Password:</label>
      <input
        className="login-input"
        id="password-input"
        type="password"
        value={pass}
        name="password-input"
        onChange={setPass}
      />
    </div>
    <button type="submit" disabled={!user.length || !pass.length}>login</button>
  </form>
)

export default LoginForm
