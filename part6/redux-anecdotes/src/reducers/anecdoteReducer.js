import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    increaseVote(state, action) {
      const id = action.payload;
      state.find((a) => a.id === id).votes += 1
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const response = await anecdoteService.updateVote(anecdote)
    dispatch(increaseVote(anecdote.id))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.addToDb(asObject(content))
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const { setAnecdotes, appendAnecdote, increaseVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer;
