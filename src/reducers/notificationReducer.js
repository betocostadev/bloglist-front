const notificationReducer = (state = { show: false, message: null, kind: null }, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return { show: true, message: action.message, kind: action.kind }
    case 'HIDE_NOTIFICATION':
      return { show: false, message: null, kind: null }
    default:
      return state
  }
}

export const notificationToggle = (message, kind, time) => {
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  return async dispatch => {
    dispatch({ type: 'SHOW_NOTIFICATION', message, kind })
    time = time * 1000
    await timeout(time)
    dispatch({ type: 'HIDE_NOTIFICATION', message })
  }
}

// export const notificationHide = message => {
//   return {
//     type: 'HIDE_NOTIFICATION',
//     message,
//   }
// }

export default notificationReducer
