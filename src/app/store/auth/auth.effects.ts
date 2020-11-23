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

import * as AuthActions from './auth.actions';
import * as ProductActions from '../product/product.actions';
import * as CustomerActions from '../customer/customer.actions';
import * as TransactionActions from '../transaction/transaction.actions';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../shared/alert/alert.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      concatMap((action) =>
        this.authService.login(action.data).pipe(
          map((response) => {
            if (response.status) {
              this.router.navigate(['dashboard']);
              return AuthActions.loginSuccess({ user: response.data });
            } else {
              return AuthActions.loginFailure({
                error: {
                  type: 'Invalid',
                  message: response.message,
                  for: 'login',
                },
              });
            }
          }),
          catchError((error) => EMPTY)
        )
      )
    );
  });

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) =>
          localStorage.setItem('user', JSON.stringify(action.user))
        )
      ),
    { dispatch: false }
  );

  // logout$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.logout),
  //       tap(() => {
  //         localStorage.removeItem('user');
  //         this.router.navigate(['login']);
  //       })
  //     ),
  //   { dispatch: false }
  // ); // If effect doesnt call another action inside its body than dispatch will be false

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
        return [
          ProductActions.clearProducts(),
          CustomerActions.clearCustomers(),
          TransactionActions.clearTransactions()
        ];
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
