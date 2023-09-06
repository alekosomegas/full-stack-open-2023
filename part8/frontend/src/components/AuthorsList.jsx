import { useField } from "../hooks/useField"
import { gql, useMutation } from '@apollo/client'
import { useState } from "react"

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
    const [name, setName] = useState()
    const born = useField('number')
    
    const [ editAuthor ] = useMutation(EDIT_AUTHOR,  {
		refetchQueries: [ { query: ALL_AUTHORS } ],
        onError: (error) => {
          const messages = error.graphQLErrors[0].message
        }
      })

    const handleUpdate = (e) => {
        e.preventDefault()

        editAuthor({variables: {name: name, setBornTo: Number(born.value)}})

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
                    <select onChange={(e) => setName(e.target.value)} value={name}>
                        <option></option>
                        {authors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                    </select>

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