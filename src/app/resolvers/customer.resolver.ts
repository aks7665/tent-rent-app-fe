import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { AppState } from '../store';
import { isCustomersLoaded } from '../store/customer/customer.selectors';
import { loadingCustomers } from '../store/customer/customer.actions';

@Injectable()
export class CustomerResolver implements Resolve<any> {
  loading = false;

  constructor(private store: Store<AppState>) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(isCustomersLoaded),
        tap((loaded) => {
          if (!this.loading && !loaded) {
            this.loading = true;
            this.store.dispatch(loadingCustomers());
          }
        }),
        filter(loaded => loaded),
        first(), // Wait for first observable to get values or error
        finalize(() => this.loading = false) // Runs in last
      );
  }
}
