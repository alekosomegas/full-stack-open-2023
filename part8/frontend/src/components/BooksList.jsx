import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const BookList = ({ books, allGenres }) => {
	const [genre, setGenre] = useState('all genres')
	const [booksList, setBooksList] = useState(books)
	allGenres = [...allGenres, 'all genres']
	
	const handleChangeGenreFilter = (e) => {
		setGenre(e.target.id)
		const byGenre = book => e.target.id === 'all genres' ? book : book.genres.includes(e.target.id)
		setBooksList(books.filter(byGenre))
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
					{booksList.map((a) => (
						<tr key={a.id}>
							<th>{a.title}</th>
							<th>{a.author.name}</th>
							<th>{a.published}</th>
						</tr>
					))}
				</tbody>
			</table>
			<div data-toggle="buttons">
				{allGenres.map(g => (
					<label key={g}>
						<input type='radio' name='genres' id={g}  checked={genre === g} onChange={handleChangeGenreFilter} />
						{g}
					</label>
				))}
			</div>
		</div>
	)
}

export default BookList
