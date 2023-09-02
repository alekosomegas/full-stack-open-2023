import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		appendUser(state, action) {
			state.push(action.payload)
		},
		setUsers(state, action) {
			return action.payload
		},
	},
})

export const initializeUsers = () => {
	return async (dispatch) => {
		const users = await usersService.getAll()
		dispatch(setUsers(users))
	}
}

export const { setUsers, appendUser } = usersSlice.actions
export default usersSlice.reducer
