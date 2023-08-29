import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
	createNotification,
	removeNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => {
		const filter = state.filter
		return state.anecdotes.filter((a) =>
			a.content?.toLowerCase().includes(filter?.toLowerCase())
		)
	})

	const dispatch = useDispatch()

	const vote = (anecdote) => {
		dispatch(voteAnecdote(anecdote))
		dispatch(createNotification(`you voted '${anecdote.content}'`))
		setTimeout(() => dispatch(removeNotification()), 5000)
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes
				.sort((a, b) => b.votes - a.votes)
				.map((anecdote) => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => vote(anecdote)}>
								vote
							</button>
						</div>
					</div>
				))}
		</div>
	)
}

export default AnecdoteList
