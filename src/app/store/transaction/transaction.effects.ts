import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { AlertService } from '../../shared/alert/alert.service';
import { Router } from '@angular/router';
import * as TransactionActions from './transaction.actions';
import * as ProductActions from '../product/product.actions';
import { TransactionService } from '../../services/transaction.service';

@Injectable()
export class TransactionEffects {

  addTransaction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionActions.addTransaction),
      concatMap(action =>
        this.transactionService.create(action.transaction).pipe(
          map(response => {
            this.helperService.showSnackbar(response.message);
            if (response.status) {
              this.router.navigate(['dashboard', 'transactions']);
              return TransactionActions.addTransactionSuccess({
                transaction: response.data.transaction,
                parentTransaction: response.parentTransaction,
                product: response.data.product
              });
            } else {
              return TransactionActions.addTransactionFailure({
                error: {
                  type: 'Invalid',
                  message: response.message
                }
              });
            }
          }),
          catchError(error => EMPTY)
        )
      )
    );
  });

  addTransactionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.addTransactionSuccess),
      concatMap((action) => {
        if (action.parentTransaction) {
          return [
            ProductActions.updateProduct({ product: action.product }),
            TransactionActions.updateTransaction({ transaction: action.parentTransaction })
          ];
        } else {
          return [
            ProductActions.updateProduct({ product: action.product })
          ];
        }
      })
    )
  );

  loadingTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionActions.loadingTransactions),
      concatMap((action) =>
        this.transactionService.getAll().pipe(
          map((response) => {
            if (response.status) {
              return TransactionActions.loadTransactions({ transactions: response.data });
            } else {
              return TransactionActions.loadTransactions({ transactions: [] });
            }
          })
        )
      )
    );
  });


  constructor(
    private actions$: Actions,
    private helperService: AlertService,
    private transactionService: TransactionService,
    private router: Router
  ) {}
}
