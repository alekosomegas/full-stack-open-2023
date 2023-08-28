import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => {
		const filter = state.filter
		return state.anecdotes.filter(a => 
       a.content?.toLowerCase().includes(filter?.toLowerCase())) 
	})

	const dispatch = useDispatch()

	const vote = (id) => {
		console.log('vote', id)
		dispatch(voteAnecdote(id))
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
							<button onClick={() => vote(anecdote.id)}>vote</button>
						</div>
					</div>
				))}
		</div>
	)
}

export default AnecdoteList
