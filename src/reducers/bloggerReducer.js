import usersService from '../services/users'

const bloggerReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGGER': {
      return action.data
    }

    default:
      break
  }

  return state
}

export const initializeBlogger = (id) => {
  return async dispatch => {
    const blogger = await usersService.getBlogger(id)
    dispatch({ type: 'INIT_BLOGGER', data: blogger })
  }
}

export default bloggerReducer
