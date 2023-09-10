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


export const CREATE_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
  }
}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
    }
  }
`