import { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'
import { logOut, getUser } from './reducers/userReducer'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { UsersList } from './components/UsersList'
import { initializeUsers } from './reducers/usersReducer'
import User from './components/User'
import SingleBlog from './components/SingleBlog'

const App = () => {
	const user = useSelector((state) => state.user)
	const blogFormRef = useRef()

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
		dispatch(getUser())
		dispatch(initializeUsers())
	}, [])

	const handleLogout = () => {
		dispatch(logOut())
	}

	return (
		<div>
      <Link to={'/'}>Blogs</Link>
      <Link to={'/users'}>Users</Link>

			<h2>blogs</h2>
			<Routes>
				<Route
					path='/'
					element={
						user ? (
							<div>
								<p>
									{`${user.name} logged in`}
									<button onClick={handleLogout}>Log out</button>
								</p>
								<Togglable buttonLabel='create new blog' ref={blogFormRef}>
									<BlogForm />
								</Togglable>
								<BlogList />
							</div>
						) : (
							<Navigate replace={true} to='/login' />
						)
					}
				/>
				<Route
					path='/login'
					element={user ? <Navigate replace to={'/'} /> : <LoginForm />}
				/>
				<Route path='/users' element={<UsersList />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='blogs/:id' element={<SingleBlog />} />
			</Routes>

			<Notification />
		</div>
	)
}

export default App
