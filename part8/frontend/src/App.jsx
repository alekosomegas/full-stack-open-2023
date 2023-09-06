import { useEffect } from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import AuthorsList from './components/AuthorsList'
import BookList from './components/BooksList'
import { gql, useQuery } from '@apollo/client'
import BookForm from './components/BookForm'

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
			<Link to={'/books'}>books</Link>
			<Link to={'/add-book'}>add book</Link>
			<Routes>
				<Route path='/' element={<AuthorsList authors={resultAuthors.data.allAuthors} ALL_AUTHORS={ALL_AUTHORS}/>} />
				<Route path='/books' element={<BookList books={resultBooks.data.allBooks} />} />
				<Route path='/add-book' element={<BookForm ALL_BOOKS={ALL_BOOKS}/>} />
			</Routes>
		</div>
	)
}

export default App
