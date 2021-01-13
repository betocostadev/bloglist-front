import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ user, handleLogout }) => {
  return (
    <div>
      <Link style={{padding: '5px'}} to="/">home</Link>
      <Link style={{padding: '5px'}} to="/users">users</Link>
      { user
        ? <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
        : null
      }
    </div>
  )
}

export default Navbar
