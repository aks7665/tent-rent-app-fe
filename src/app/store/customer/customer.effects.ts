import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { AlertService } from '../../shared/alert/alert.service';
import { Router } from '@angular/router';
import * as CustomerActions from './customer.actions';
import { CustomerService } from '../../services/customer.service';

@Injectable()
export class CustomerEffects {

  addCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomerActions.addCustomer),
      concatMap(action =>
        this.customerService.create(action.customer).pipe(
          map(response => {
            this.helperService.showSnackbar(response.message);
            if (response.status) {
              this.router.navigate(['dashboard', 'customers']);
              return CustomerActions.addCustomerSuccess({ customer: response.data });
            } else {
              return CustomerActions.addCustomerFailure({
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

  loadingCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomerActions.loadingCustomers),
      concatMap((action) =>
        this.customerService.getAll().pipe(
          map((response) => {
            if (response.status) {
              return CustomerActions.loadCustomers({ customers: response.data });
            } else {
              return CustomerActions.loadCustomers({ customers: [] });
            }
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private helperService: AlertService,
    private customerService: CustomerService,
    private router: Router
  ) {}
}
