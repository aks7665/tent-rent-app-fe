import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { AppState } from '../store';
import { isTransactionsLoaded } from '../store/transaction/transaction.selectors';
import { loadingTransactions } from '../store/transaction/transaction.actions';

@Injectable()
export class TransactionResolver implements Resolve<any> {
  loading = false;

  constructor(private store: Store<AppState>) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(isTransactionsLoaded),
        tap((loaded) => {
          if (!this.loading && !loaded) {
            this.loading = true;
            this.store.dispatch(loadingTransactions());
          }
        }),
        filter(loaded => loaded),
        first(), // Wait for first observable to get values or error
        finalize(() => this.loading = false) // Runs in last
      );
  }
}
