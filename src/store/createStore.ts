import { compose, configureStore } from ".";
import { ConfigureStore, MiddlewareAPI, Store } from "../types";

export const createStore: ConfigureStore<any, any> = (
  reducer,
  initialState,
  middlewares
) => {
  const store: Store<any, any> = configureStore(reducer, initialState);

  if (middlewares && middlewares.length > 0) {
    const middlewareAPI: MiddlewareAPI<any, any> = {
      getState: store.getState,
      dispatch: (action: any) => store.dispatch(action),
    };
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    const enhancedDispatch = compose(...chain)(store.dispatch) as (action: any) => any;
    store.dispatch = enhancedDispatch;
  }

  return store;
};