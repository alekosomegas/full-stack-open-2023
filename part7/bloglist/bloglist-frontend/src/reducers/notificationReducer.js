import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationReducer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return ''
        }
    }
})

export const setNotification = (message, time) => {
    return (dispatch) => {
        dispatch(createNotification(message))
        setTimeout(() => dispatch(removeNotification()), time*1000)
    }
}

export const { createNotification, removeNotification } = notificationReducer.actions
export default notificationReducer.reducer