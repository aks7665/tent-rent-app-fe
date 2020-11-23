import { Action, createReducer, on } from '@ngrx/store';
import * as InitializeActions from './initialize.actions';

export const initializeFeatureKey = 'initialize';

export interface State {
  loading: boolean;
}

export const initialState: State = {
  loading: false
};

const initializeReducer = createReducer(
  initialState,
  on(InitializeActions.initialize, (state, action) => {
    return {
      ...state,
      loading: true
    };
  }),
  on(InitializeActions.initializeSuccess, (state, action) => {
    return {
      ...state,
      loading: false
    };
  })
);

// tslint:disable-next-line: typedef
export function reducer(state: State | undefined, action: Action) {
  return initializeReducer(state, action);
}
