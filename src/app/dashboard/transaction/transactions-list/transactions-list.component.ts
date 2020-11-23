import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/models/transaction.model';
import { AppState } from 'src/app/store';
import { fetchAllTransactions } from 'src/app/store/transaction/transaction.selectors';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit {

  transactions$: Observable<Transaction[]>;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.transactions$ = this.store.pipe(select(fetchAllTransactions));
  }

  redirectTo(path): void {
    this.router.navigate(path);
  }

}
