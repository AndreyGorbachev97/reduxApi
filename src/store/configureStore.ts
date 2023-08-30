import { Reducer } from "../types";

export const configureStore = <State, Action>(
  reducer: Reducer<State, Action>,
  initState?: State | undefined
) => {
  let state = initState;
  const cbs: Set<() => void> = new Set();
  return {
    getState() {
      return state;
    },
    subscribe(cb: () => void) {
      cbs.add(cb);
      return () => {
        cbs.delete(cb);
      };
    },
    dispatch(action: Action) {
      state = reducer(state, action);
      cbs.forEach((cb) => {
        cb();
      })
    }
  };
};

// export const compose = <R>(...funcs: any[]): ((arg: R) => R) => {
//   if (funcs.length === 0) {
//     // Если функций нет, просто вернуть исходный аргумент.
//     return (arg: R) => arg;
//   }
//   if (funcs.length === 1) {
//     // Если только одна функция, вернуть её.
//     return funcs[0];
//   }
//   // Используем функцию reduce для композиции функций в цепочку вызовов.
//   return funcs.reduce((a, b) => (...args: any[]) => a(b(...args)));
// };

// export const createStore: ConfigureStore<any, any> = (
//   reducer,
//   initialState,
//   middlewares
// ) => {
//   const store: Store<any, any> = configureStore(reducer, initialState);

//   if (middlewares && middlewares.length > 0) {
//     const middlewareAPI: MiddlewareAPI<any, any> = { // Используйте MiddlewareAPI
//       getState: store.getState,
//       dispatch: (action: any) => store.dispatch(action),
//     };
//     const chain = middlewares.map((middleware) => middleware(middlewareAPI));
//     const enhancedDispatch = compose(...chain)(store.dispatch) as (action: any) => any;
//     store.dispatch = enhancedDispatch;
//   }

//   return store;
// };

// export const replaceReducer = <State, Action extends { type: string }>(
//   store: Store<State, Action>,
//   nextReducer: Reducer<State, Action>
// ) => {
//   const replaceAction: unknown = { type: '@@redux/REPLACE_REDUCER' };
//   const newStore = createStore(nextReducer, store.getState());

//   const newSubscribe = () => {
//     newStore.dispatch(replaceAction);
//   };

//   return {
//     ...store,
//     dispatch: newStore.dispatch,
//     subscribe: newSubscribe,
//     getState: newStore.getState,
//   };
// };