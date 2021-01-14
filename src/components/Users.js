import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <div>
        <h2>Blog app users</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Blogs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            { users.map(usr =>
              <TableRow key={usr.id}>
                <TableCell>
                  <Link to={`/users/${usr.id}`}>{usr.name}</Link>
                </TableCell>
                <TableCell>
                  {usr.blogs.length}
                </TableCell>
              </TableRow>
            )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default Users
