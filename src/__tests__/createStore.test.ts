import { createStore } from '../store';

describe('createStore', () => {
  const initialState = {state: 'test'};
  const reducerMock = jest.fn();
  
  const middlewareMock = (storeAPI: any) => (next: any) => (action: any) => {
    return next(action);
  };

  it('returns a store with getState, dispatch, and subscribe methods', () => {
    const store = createStore(reducerMock, initialState);
    
    expect(store.getState).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
  });

  it('calls reducer when dispatching', () => {
    reducerMock.mockReturnValueOnce(initialState);

    const store = createStore(reducerMock, initialState);
    store.dispatch({ type: 'SOME_ACTION' });

    expect(reducerMock).toHaveBeenCalledWith(initialState, { type: 'SOME_ACTION' });
  });

  it('returns the updated state after dispatching', () => {
    const newState = {};
    reducerMock.mockReturnValueOnce(newState);

    const store = createStore(reducerMock, initialState);
    store.dispatch({ type: 'SOME_ACTION' });

    expect(store.getState()).toBe(newState);
  });

  it('applies middleware and updates state correctly', () => {
    const newState = { };
    reducerMock.mockReturnValueOnce(newState);

    const store = createStore(reducerMock, initialState, [middlewareMock]);

    const action = { type: 'SOME_ACTION' };
    store.dispatch(action);

    expect(reducerMock).toHaveBeenCalledWith(initialState, action);
    expect(store.getState()).toBe(newState);
  });
});