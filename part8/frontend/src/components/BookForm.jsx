import { useField } from '../hooks/useField'
import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Navigate, useNavigate } from 'react-router-dom'
import { CREATE_BOOK } from '../queries'


const BookForm = ({ ALL_BOOKS }) => {
	const [genres, setGenres] = useState([])
	const navigate = useNavigate();

    const [ createBook ] = useMutation(CREATE_BOOK,  {
		refetchQueries: [ { query: ALL_BOOKS } ],
        onError: (error) => {
          const messages = error.graphQLErrors[0].message
        }
      })

	const title = useField('text')
	const author = useField('text')
	const published = useField('number')
	const genre = useField('text')

	const handleAddGenre = () => {
		setGenres((prev) => prev.concat(genre.value))
        genre.onReset()
	}

	const handleSubmit = (e) => {
		e.preventDefault()

        createBook({ variables: { title: title.value, author: author.value, published: Number(published.value), genres } })

        title.onReset()
        author.onReset()
        published.onReset()
        genre.onReset()
        setGenres([])
		navigate('/books')
	}

	return (
		<div>
			<h2>add a book</h2>
			<form onSubmit={handleSubmit}>
				<div>
					Title:
					<input {...title} />
				</div>
				<div>
					Author:
					<input {...author} />
				</div>
				<div>
					Published:
					<input {...published} />
				</div>
				<div>
					<input {...genre} />
					<button type='button' onClick={handleAddGenre}>
						add genre
					</button>
				</div>
                <div>
                    genres: {genres.join(', ')}
                </div>
                <button>create book</button>
			</form>
		</div>
	)
}

export default BookForm
