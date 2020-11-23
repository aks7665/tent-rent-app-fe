import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/index';
import { tap } from 'rxjs/operators';
import { isLoggedOut } from '../store/auth/auth.selectors';

@Injectable()
export class AuthPageGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.store.pipe(
        select(isLoggedOut),
        tap(loggedIn => {
          if (!loggedIn) {
            this.router.navigate(['dashboard']);
          }
        })
      );
      // this.router.navigate(['dashboard']);
      // return false;
  }
}
