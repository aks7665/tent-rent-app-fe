import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { AppState } from 'src/app/store';
import { fetchAllCustomers } from 'src/app/store/customer/customer.selectors';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers$: Observable<Customer[]>;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customers$ = this.store.pipe(select(fetchAllCustomers));
  }

  redirectTo(path): void {
    this.router.navigate(path);
  }

}
