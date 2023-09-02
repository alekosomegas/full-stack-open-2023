import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks/useField'

const BlogForm = () => {
	const dispatch = useDispatch()

	const handleSubmit = (event) => {
		event.preventDefault()
		const newBlog = {
			title: title.value,
			author: author.value,
			url: url.value,
			likes: 0,
		}
		dispatch(createBlog(newBlog))
		dispatch(
			setNotification(
				`a new blog: ${newBlog.title} by ${newBlog.author} added`,
				5
			)
		)
		handleReset()
	}

	const title = useField('text')
	const author = useField('text')
	const url = useField('text')

	const handleReset = () => {
		title.onReset()
		author.onReset()
		url.onReset()
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1>create new</h1>
			<div>
				title:
				<input name='title' {...title} />
			</div>
			<div>
				author
				<input name='author' {...author} />
			</div>
			<div>
				url
				<input type='text' {...url} />
			</div>
			<button type='submit'>create</button>
		</form>
	)
}

export default BlogForm
