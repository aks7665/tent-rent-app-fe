import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  tap,
  switchMap
} from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as InitializeActions from './initialize.actions';
import * as ProductActions from '../product/product.actions';
import * as CustomerActions from '../customer/customer.actions';
import { AlertService } from '../../shared/alert/alert.service';
import { InitializeService } from '../../services/initialize.service';
import * as TransactionActions from '../transaction/transaction.actions';

@Injectable()
export class InitializeEffects {

  initialize$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InitializeActions.initialize),
      concatMap((action) =>
        this.initializeService.initializeRecords().pipe(
          map((response) => {
            this.alertService.showSnackbar(response.message);
            if (response.status) {
              const payload = {
                customers: response.data.customers,
                products: response.data.products
              };
              return InitializeActions.initializeSuccess(payload);
            }
          }),
          catchError((error) => EMPTY)
        )
      )
    );
  });

  initializeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InitializeActions.initializeSuccess),
      concatMap((action) => {
        return [
          ProductActions.loadProducts({ products: action.products }),
          CustomerActions.loadCustomers({ customers: action.customers }),
          TransactionActions.clearTransactions()
        ];
      })
    )
  );
  constructor(
    private actions$: Actions,
    private initializeService: InitializeService,
    private alertService: AlertService
  ) {}
}
