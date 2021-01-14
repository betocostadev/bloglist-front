import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core'
import BookIcon from '@material-ui/icons/Book'

const Navbar = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser(user))
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <BookIcon />
        <h3>Blog App</h3>
        <IconButton edge="start" color="default" aria-label="menu">
        </IconButton>
        <Button color="inherit" component={Link} to="/">home</Button>
        <Button color="inherit" component={Link} to="/users">users</Button>
        { user
            ?
            <div>
              <em style={{marginLeft: '0.5rem'}}>{user.username} logged in</em>
              <Button style={{marginLeft: '0.5rem'}} size="small" variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
            </div>
            : <Button style={{marginLeft: '0.5rem'}} component={Link} size="small" color="inherit" to="/login">Login</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

// <Button color="inherit">
//           {user
//             ? <em>{user} logged in</em>
//             : <Link to="/login">login</Link>
//           }
//         </Button>

// { user
//   ?
//   <div>
//     <em>{user} logged in</em>
//     <Button size="small" variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
//   </div>
//   : <Link to="/login">login</Link>
// }


// <div>
//       <Link style={{padding: '5px'}} to="/">home</Link>
//       <Link style={{padding: '5px'}} to="/users">users</Link>
//       { user
//         ? <p>{user.name} logged in
//           <Button size="small" variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
//           </p>
//         : null
//       }
//     </div>

export default Navbar
