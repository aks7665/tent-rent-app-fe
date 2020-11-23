import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/store';
import { selectUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-dashboard-landing',
  templateUrl: './dashboard-landing.component.html',
  styleUrls: ['./dashboard-landing.component.css']
})
export class DashboardLandingComponent implements OnInit {
  user: User;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(selectUser).subscribe(user => {
      this.user = user;
    });
  }

}
