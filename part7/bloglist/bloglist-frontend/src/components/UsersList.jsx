import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const UsersList = () => {

    const users = useSelector(state => state.users)

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr><th></th><th>blogs created</th></tr>
                </thead>
                <tbody>
                    {users.map(u => <tr key={u.username}><th><Link to={`/users/${u.id}`}>{u.name}</Link></th><th>{u.blogs.length}</th></tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default UsersList