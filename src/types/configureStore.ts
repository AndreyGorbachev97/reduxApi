import { Middleware, Reducer, Store } from ".";

export type ConfigureStore<State, Action> = (
  reducer: Reducer<State, Action>,
  initialState?: State | undefined,
  middlewares?: Middleware<State, Action>[]
) => Store<State, Action>;