import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { logout } from 'src/app/store/auth/auth.actions';
import { selectUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select(selectUser).subscribe(user => {
      this.isLoggedIn = user ? true : false;
    });
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }

}
