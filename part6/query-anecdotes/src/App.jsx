import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import { useNotificationDispatch } from './notificationContext'

const App = () => {
  const queryClient = useQueryClient()

  const votesMutation = useMutation(voteAnecdote, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  })
  
  const dispatch = useNotificationDispatch()

  const handleVote = (anecdote) => {
    console.log('vote')
    votesMutation.mutate(anecdote)
    dispatch({ type: 'VOTE', payload: anecdote })
  }
 
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
