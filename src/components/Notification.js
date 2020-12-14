import React from 'react'
import './Notification.css'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification.message === null) {
    return null
  }

  return (
    <div className={ notification.kind === 'success' ? 'success-message' : notification.kind === 'error' ? 'error-message' : null}>
      {notification.message}
    </div>
  )
}

export default Notification
