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
    voteAnecdote(state, action) {
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

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.addToDb(asObject(content))
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer;
