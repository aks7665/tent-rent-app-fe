import { createAction, props } from '@ngrx/store';
import { Transaction } from '../../models/transaction.model';
import { ErrorForm } from '../../models/error-form.model';
import { Product } from 'src/app/models/product.model';

// Fetch Transactions
export const loadingTransactions = createAction(
  '[Transaction/Effect] Loading Transactions'
);
export const loadTransactions = createAction(
  '[Transaction/Load All] Load Transactions',
  props<{ transactions: Transaction[] }>()
);

// Add Transaction
export const addTransaction = createAction(
  '[Transaction/Effect] Add Transaction',
  props<{ transaction: Partial<Transaction> }>()
);
export const addTransactionFailure = createAction(
  '[Transaction/Error] Add Transaction Failure',
  props<{ error: ErrorForm }>()
);
export const addTransactionSuccess = createAction(
  '[Transaction/Success] Add Transaction Success',
  props<{ transaction: Transaction, product: Product, parentTransaction?: Transaction }>()
);

export const updateTransaction = createAction(
  '[Transaction] Update Transaction',
  props<{ transaction: Transaction }>()
);

export const clearTransactions = createAction(
  '[Transaction] Clear Transactions'
);
