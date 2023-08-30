export interface MiddlewareAPI<State, Action> {
  getState: () => State;
  dispatch: (action: Action) => any;
  subscribe?: (cb: () => void) => () => void; // Здесь subscribe делаем опциональным
}

export type Middleware<State, Action> = (
  store: MiddlewareAPI<State, Action>
) => (next: (action: Action) => any) => (action: Action) => any;