const AuthorsList = ({ authors }) => {
    console.log(authors);
    return (
        <div>
            <h2>authors</h2>
            <table>
                <thead>
                    <tr><th></th><th><b>born</b></th><th>books</th></tr>
                </thead>
                <tbody>
                    {authors.map(a => <tr key={a.id}>
                        <th>{a.name}</th>
                        <th>{a.born}</th>
                        <th>{a.bookCount}</th>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default AuthorsList