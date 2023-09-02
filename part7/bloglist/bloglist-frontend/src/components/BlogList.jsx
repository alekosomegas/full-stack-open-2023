import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
	const blogs = useSelector((state) => {
		const items = [...state.blogs]
		items.sort((a, b) => {
			return b.likes - a.likes
		})
		return items
	})

	return (
		<div id='blogsContainer'>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)
}

export default BlogList
