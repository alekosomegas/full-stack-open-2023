import { useNotificationValue, useNotificationDispatch } from "../notificationContext"

const Notification = () => {
  const notification = useNotificationValue()
  const dispatch = useNotificationDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: notification ? '' : 'none'
  }
  
  setTimeout(() => dispatch({type:'DELETE'}), 5000)

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
