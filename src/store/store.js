import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import userReducer from '../reducers/userReducer'
import usersReducer from '../reducers/usersReducer'
import blogsReducer from '../reducers/blogsReducer'
import notificationReducer from '../reducers/notificationReducer'


const reducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  blogs: blogsReducer,
  notification: notificationReducer,
})

const store = createStore(
  reducer, composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
