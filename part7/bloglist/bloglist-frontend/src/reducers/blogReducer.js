import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		appendBlog(state, action) {
			state.push(action.payload)
		},
		setBlogs(state, action) {
			return action.payload
		},
        increaseLike(state, action) {
            const id = action.payload
            state.find(b => b.id === id).likes += 1
        },
        removeBlog(state, action) {
			console.log(action);
            return state.filter(b => b.id !== action.payload.id)
        },
		addCommentF(state, action) {
			const updatedBlog = state.find(b => b.id === action.payload.blog.id )
			updatedBlog.comments.push(action.payload.comment)

		}
	},
})

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const createBlog = (blog) => {
	return async (dispatch) => {
		const newBlog = await blogService.create(blog)
		dispatch(appendBlog(newBlog))
	}
}

export const likeBlog = (blog) => {
    return async (dispatch) => {
        const response = await blogService.increaseLike(blog)
        dispatch(increaseLike(blog.id))
    }
}

export const addComment = (blog, comment) => {
	return async (dispatch) => {
		const response = await blogService.addComment(blog, comment)
		dispatch(addCommentF({blog: blog, comment: comment }))
	}
}

export const deleteBlog = (blog) => {
    return async (dispatch) => {
        const response = await blogService.remove(blog.id)
        dispatch(removeBlog(blog))
    }
}

export const { setBlogs, appendBlog, increaseLike, removeBlog, addCommentF } = blogSlice.actions
export default blogSlice.reducer
