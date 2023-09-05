import { useEffect } from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import AuthorsList from './components/AuthorsList'
import BookList from './components/BooksList'
import { gql, useQuery } from '@apollo/client'

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

const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    author
    genres
    id
  }
}
`

const App = () => {
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)

  if (resultAuthors.loading || resultBooks.loading) {
    return <div>loading...</div>
  }

	return (
		<div>
			<Link to={'/'}>authors</Link>
			<Link to={'/books '}>books</Link>
			<Routes>
				<Route path='/' element={<AuthorsList authors={resultAuthors.data.allAuthors} />} />
				<Route path='/books' element={<BookList books={resultBooks.data.allBooks} />} />
			</Routes>
		</div>
	)
}

export default App
