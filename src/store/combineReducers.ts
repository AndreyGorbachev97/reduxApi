export const combineReducers = (reducers?: Record<string, Function>) => {
  // root reducer
  return (initialState, action) => {
    let state = {};
    for (const [key, reducer] of Object.entries(reducers)) {
      state[key] = reducer(initialState?.[key], action);
    }
    return state;
  };
};