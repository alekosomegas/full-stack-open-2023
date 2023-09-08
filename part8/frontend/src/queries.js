import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation login($username: String!) {
    login(username: $username)  {
      value
    }
  }
`