import { Action, createReducer, on } from '@ngrx/store';
import * as TransactionActions from './transaction.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Transaction } from '../../models/transaction.model';
import { ErrorForm } from '../../models/error-form.model';

export const transactionFeatureKey = 'transaction';

// tslint:disable-next-line: no-empty-interface
export interface State { }

export interface State extends EntityState<Transaction> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
  error: ErrorForm;
}

export const adapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>({
  sortComparer: sortByDate, // For sorting
  selectId: data => data._id
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false,
  error: undefined
});

const transactionReducer = createReducer(
  initialState,
  on(TransactionActions.addTransaction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: undefined
    };
  }),
  on(TransactionActions.addTransactionSuccess,
    (state, action) =>
      adapter.addOne(
        action.transaction,
        { ...state, loading: false, loaded: false }
      ),
  ),
  on(TransactionActions.addTransactionFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    };
  }),
  on(TransactionActions.updateTransaction,
    (state, action) => {
      return adapter.updateOne(
        {
          id: action.transaction._id,
          changes: action.transaction
        },
        {...state, loading: false, loaded: true}
      );
    }
  ),
  on(TransactionActions.loadingTransactions, (state, action) => {
    return {
      ...state,
      loading: true,
      error: undefined,
      loaded: false
    };
  }),
  on(TransactionActions.loadTransactions,
    (state, action) => adapter.setAll(action.transactions, { ...state, loading: false, loaded: true })
  ),
  on(TransactionActions.clearTransactions,
    (state, action) => adapter.removeAll({ ...state, loading: false, loaded: false, error: undefined })
  )
);

// Get all selectors - getEntities, getIds, getAll
export const select = adapter.getSelectors(); // Entitity Adapter Selector

export function sortByDate(a: Transaction, b: Transaction): number {
  return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
}

// tslint:disable-next-line: typedef
export function reducer(state: State | undefined, action: Action) {
  return transactionReducer(state, action);
}
