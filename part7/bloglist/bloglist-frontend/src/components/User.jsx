import { useMatch } from "react-router-dom"
import { useSelector } from "react-redux"

const User = () => {
    const users = useSelector(state => state.users)

    const match = useMatch('/users/:id')
    const user = match ? users.find(u => u.id === match.params.id) : null

    if (!user) {
        return null
    }

    return (
        <div>
            <h3>{user.name}</h3>
            <h5>added blogs</h5>
            <ul>
                {user.blogs.map(b => (
                    <li key={b.id}>{b.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default User