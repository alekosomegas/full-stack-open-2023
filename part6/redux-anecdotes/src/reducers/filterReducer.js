
const initialState = ''

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "FILTER":
        return action.payload.filter
    default:
      return state;
  }
};

export const createFilter = (filter) => {
    return {
        type: 'FILTER',
        payload: { filter }
    }
}

export default reducer;
