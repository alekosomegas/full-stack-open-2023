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

export const FILTER_BOOKS_BY_GENRE = gql `
query allBooksByGenre($genre: String) {
  allBooksByGenre(genre: $genre) {
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

export const ME = gql `
    query {
        me {
            favoriteGenre
        }
    }
`