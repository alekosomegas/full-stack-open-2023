import { useField } from '../hooks/useField'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const username = useField('text')
	const password = useField('password')

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username: username.value,
				password: password.value,
			})
			dispatch(setUser(user))
			navigate('/')
		} catch (exception) {
			console.log(exception)
			dispatch(setNotification('wrong username or password', 5))
		}
	}

	return (
		<form onSubmit={handleLogin}>
			<h1>log in to application</h1>
			<div>
				username
				<input id='username' name='Username' {...username} />
			</div>
			<div>
				password
				<input id='password' name='Password' {...password} />
			</div>
			<button type='submit' id='login-btn'>
				login
			</button>
		</form>
	)
}

export default LoginForm
