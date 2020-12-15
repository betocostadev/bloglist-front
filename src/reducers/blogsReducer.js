import blogsService from '../services/blogs'

const blogsReducer = (state = [], action) => {

  switch (action.type) {
    // case 'ADD_VOTE':
    //   // console.log('reducer add vote', action)
    //   const id = action.data
    //   const anecdoteToChange = state.find(a => a.id === id)
    //   const changedAnecdote = {
    //     ...anecdoteToChange, votes: anecdoteToChange.votes + 1
    //   }
    //   return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)

    // case 'ADD_ANECDOTE':
    //   return [...state, action.data]

    case 'INIT_BLOGS': {
      return action.data
    }

    default:
      break
  }

  return state
}

// export const addVote = anecdote => {
//   return async dispatch => {
//     const anecdoteToChange = await anecdoteService.addAVote(anecdote)
//     dispatch({ type: 'ADD_VOTE', data: anecdoteToChange.id })
//   }
// }

// export const createAnecdote = content => {
//   return async dispatch => {
//     const newAnecdote = await anecdoteService.createNew(content)
//     dispatch({ type: 'ADD_ANECDOTE', data: newAnecdote })
//   }
// }

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({ type: 'INIT_BLOGS', data: blogs })
  }
}

export default blogsReducer
