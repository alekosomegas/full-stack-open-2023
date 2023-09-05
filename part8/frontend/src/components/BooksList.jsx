const BookList = ({ books }) => {
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
					{books.map((a) => (
						<tr key={a.id}>
							<th>{a.title}</th>
							<th>{a.author}</th>
							<th>{a.published}</th>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default BookList
