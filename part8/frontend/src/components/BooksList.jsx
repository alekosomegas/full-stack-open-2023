import { useEffect, useState } from 'react'
import { ME, FILTER_BOOKS_BY_GENRE } from '../queries'
import { useQuery } from '@apollo/client'

const BookList = ({ books, allGenres }) => {
	const [genre, setGenre] = useState('all genres')
	const [booksList, setBooksList] = useState(books)
	allGenres = [...allGenres, 'all genres']
	const userResult = useQuery(ME)

	const { loading, error, data } = useQuery(FILTER_BOOKS_BY_GENRE, {
		variables: { genre },
	  });

	useEffect(() => {
		if (!userResult.loading) {
			console.log(userResult)
			//setGenre(userResult.data.me.favoriteGenre)
		}

		if (!loading && !error) {
			setBooksList(data.books)
		}
	}, [userResult, loading, genre])

	useEffect(() => {
		const byGenre = (book) =>
			genre === 'all genres' ? book : book.genres.includes(genre)
		setBooksList(books.filter(byGenre))
	}, [genre])

	const handleChangeGenreFilter = (e) => {
		setGenre(e.target.id)
	}

	return (
		<div>
			<h2>books</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>
							<b>author</b>
						</th>
						<th>published</th>
					</tr>
				</thead>
				<tbody>
					{booksList?.map((a) => (
						<tr key={a.id}>
							<th>{a.title}</th>
							<th>{a.author.name}</th>
							<th>{a.published}</th>
						</tr>
					))}
				</tbody>
			</table>
			<div data-toggle='buttons'>
				{allGenres.map((g) => (
					<label key={g}>
						<input
							type='radio'
							name='genres'
							id={g}
							checked={genre === g}
							onChange={handleChangeGenreFilter}
						/>
						{g}
					</label>
				))}
			</div>
		</div>
	)
}

export default BookList
