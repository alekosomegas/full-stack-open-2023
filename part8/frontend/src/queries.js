import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation login($username: String!) {
    login(username: $username)  {
      value
    }
  }
`

export const ALL_GENRES = gql `
    query {
        allGenres 
    }
`

export const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			published
			author {
				name
			}
			genres
			id
		}
	}
`