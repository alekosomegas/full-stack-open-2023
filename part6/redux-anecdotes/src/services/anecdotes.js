import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const addToDb = async (anecdote) => {
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const updateVote = async (anecdote) => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, {...anecdote, vote: anecdote.votes + 1}, {new: true} )
}
export default { getAll, addToDb, updateVote }