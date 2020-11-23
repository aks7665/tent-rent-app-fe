import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInitialize from './initialize.reducer';

export const selectInitializeState = createFeatureSelector<fromInitialize.State>(
  fromInitialize.initializeFeatureKey
);

export const isInitializeLoading = createSelector(
  selectInitializeState,
  (state) => state.loading
);
