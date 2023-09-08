import { useField } from "../hooks/useField";
import { LOGIN } from "../queries"
import { useMutation } from "@apollo/client";
import { useEffect } from "react";

const LoginForm = ({ setToken }) => {
    const username = useField('text')
   
    const [ login, result ] = useMutation(LOGIN)

      useEffect(() => {
        if ( result.data ) {
          const token = result.data.login.value
          setToken(token)
          localStorage.setItem('phonenumbers-user-token', token)
        }
      }, [result.data]) // eslint-disable-line

      const submit = async (event) => {
        event.preventDefault()
    
        login({ variables: { username: username.value } })
      }

    return (
        <form onSubmit={submit}>
            <div>
                Username:
                <input {...username}></input>
            </div>
            <button type='submit'>login</button>
        </form>
    )
}

export default LoginForm