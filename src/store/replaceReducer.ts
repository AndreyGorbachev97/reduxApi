import { createStore } from ".";
import { Reducer, Store } from "../types";

export const replaceReducer = <State, Action extends { type: string }>(
  store: Store<State, Action>,
  nextReducer: Reducer<State, Action>
) => {
  const replaceAction: unknown = { type: '@@redux/REPLACE_REDUCER' };
  const newStore = createStore(nextReducer, store.getState());

  const newSubscribe = () => {
    newStore.dispatch(replaceAction);
  };

  return {
    ...store,
    dispatch: newStore.dispatch,
    subscribe: newSubscribe,
    getState: newStore.getState,
  };
};