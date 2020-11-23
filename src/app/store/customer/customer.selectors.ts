import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCustomer from './customer.reducer';

export const selectCustomersState = createFeatureSelector<fromCustomer.State>(
  fromCustomer.customerFeatureKey
);

export const isCustomersLoading = createSelector(
  selectCustomersState,
  (state) => state.loading
);

export const isCustomersLoaded = createSelector(
  selectCustomersState,
  (state) => state.loaded
);

export const fetchCustomerError = createSelector(
  selectCustomersState,
  (state) => state.error
);

export const fetchAllCustomers = createSelector(
  selectCustomersState,
  fromCustomer.select.selectAll
);

