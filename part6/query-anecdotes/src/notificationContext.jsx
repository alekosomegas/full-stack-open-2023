import { useContext, createContext, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'NEW':
			return `anecdote '${action.payload.content}' created`
		case 'VOTE':
			return `anecdote '${action.payload.content}' voted`
        case 'DELETE':
            return null
        case 'ERROR':
            return action.payload
    }
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}
export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext
