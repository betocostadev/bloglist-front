import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input, InputLabel, InputAdornment, FormControl, Button} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
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
    <form className="login-form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel htmlFor="username-input">Username</InputLabel>
        <Input
          id="username-input"
          name="username-input"
          required type="text" value={username} onChange={handleChange}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password-input">Password</InputLabel>
        <Input
          id="password-input"
          name="password-input"
          required type="password" value={password} onChange={handleChange}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <Button variant="contained" color="primary" type="submit" disabled={!username.length || !password.length}>login</Button>
    </form>
  )
}

LoginForm.propTypes = {
  loginHandler: PropTypes.func.isRequired
}

export default LoginForm
