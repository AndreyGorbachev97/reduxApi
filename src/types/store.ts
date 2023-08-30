export type Store<State = any, Action = { type: string, payload?: any }> = {
  getState(): State;
  dispatch(action: Action): any;
  subscribe(cb: () => void): () => void;
};
