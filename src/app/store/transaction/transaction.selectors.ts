import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTransaction from './transaction.reducer';

export const selectTransactionsState = createFeatureSelector<fromTransaction.State>(
  fromTransaction.transactionFeatureKey
);

export const isTransactionsLoading = createSelector(
  selectTransactionsState,
  (state) => state.loading
);

export const isTransactionsLoaded = createSelector(
  selectTransactionsState,
  (state) => state.loaded
);

export const fetchTransactionError = createSelector(
  selectTransactionsState,
  (state) => state.error
);

export const fetchAllTransactions = createSelector(
  selectTransactionsState,
  fromTransaction.select.selectAll
);

export const fetchReturnableTrnsactions =  createSelector(
  fetchAllTransactions,
  (state) => state.filter(transaction => !transaction.transationIdParent )
);

