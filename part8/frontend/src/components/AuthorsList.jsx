import { useField } from "../hooks/useField"
import { gql, useMutation } from '@apollo/client'

const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
        name: $name,
        setBornTo: $setBornTo
  ) {
    name
    born
  }
}
`

const AuthorsList = ({ authors, ALL_AUTHORS }) => {
    const name = useField('text')
    const born = useField('number')
    
    const [ editAuthor ] = useMutation(EDIT_AUTHOR,  {
		refetchQueries: [ { query: ALL_AUTHORS } ],
        onError: (error) => {
          const messages = error.graphQLErrors[0].message
        }
      })

    const handleUpdate = (e) => {
        e.preventDefault()

        editAuthor({variables: {name: name.value, setBornTo: Number(born.value)}})

        name.onReset()
        born.onReset()
    }


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
            <h2>Set birthyear</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    Name:
                    <input {...name} />
                </div>
                <div>
                    born:
                    <input {...born} />
                </div>
                <button>update author</button>
            </form>
        </div>
    )
}

export default AuthorsList