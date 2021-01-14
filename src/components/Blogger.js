import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'
// import usersService from '../services/users'
import {
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const Blogger = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    if (users.length) {
      return
    } else {
      dispatch(initializeUsers())
    }
  }, [dispatch, users.length])

  const blogger = users.find(u => u.id === id)

  return (
    <div>
      {
        !blogger || !blogger.blogs ?
        <CircularProgress style={{position: 'fixed', top: '46%', left: '46%'}} />
        :

        <div>
          <h2>{blogger.name}</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Added blogs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              { blogger.blogs.map(b =>
                <TableRow key={b.id}>
                  <TableCell>
                    <Link to={`/blogs/${b.id}`}>{b.title}</Link>
                  </TableCell>
                </TableRow>
              )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      }
    </div>
  )
}

export default Blogger
