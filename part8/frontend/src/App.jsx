import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import AuthorsList from './components/AuthorsList'
import BookList from './components/BooksList'
import { gql, useQuery, useApolloClient } from '@apollo/client'
import BookForm from './components/BookForm'
import LoginForm from './components/LoginForm'
import { ALL_GENRES, ALL_BOOKS } from './queries'

const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
			id
		}
	}
`

const App = () => {
	const resultAuthors = useQuery(ALL_AUTHORS)
	const resultBooks = useQuery(ALL_BOOKS)
  const resultGenres = useQuery(ALL_GENRES)
	const [token, setToken] = useState(null)

	const client = useApolloClient()

	if (resultAuthors.loading || resultBooks.loading) {
		return <div>loading...</div>
	}

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	return (
		<div>
			<Link to={'/'}>authors</Link>
			<Link to={'/books'}>books</Link>
			{!token ? (
				<Link to={'/login'}>Login</Link>
			) : (
				<Link to={'/add-book'}>add book</Link>
			)}
			<Routes>
				<Route
					path='/'
					element={
						<AuthorsList
							authors={resultAuthors.data?.allAuthors}
							ALL_AUTHORS={ALL_AUTHORS}
						/>
					}
				/>
				<Route
					path='/books'
					element={<BookList books={resultBooks.data?.allBooks} allGenres={resultGenres.data?.allGenres}/>}
				/>
				{!token ? (
					<Route path='login' element={<LoginForm setToken={setToken} />} />
				) : (
					<Route
						path='/add-book'
						element={<BookForm ALL_BOOKS={ALL_BOOKS}/>}
					/>
				)}
			</Routes>
			{token && <button onClick={logout}>logout</button>}
		</div>
	)
}

export default App
