import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const userReducer = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addUser(state, action) {
            localStorage.setItem('user', JSON.stringify(action.payload))
            return action.payload
        },
        removeUser(state, action) {
            localStorage.removeItem('user')
            return null
        }
    }
})

export const setUser = (user) => {
    return (dispatch) => {
        blogService.setToken(user?.token)
        dispatch(addUser(user))
    }
}

export const getUser = () => {
    return (dispatch) => {
        dispatch(setUser(JSON.parse(localStorage.getItem('user'))))
    }
}

export const logOut = () => {
    return (dispatch) => {
        blogService.setToken(null)
        dispatch(removeUser())
    }
}

export const { addUser, removeUser } = userReducer.actions
export default userReducer.reducer