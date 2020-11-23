import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Customer } from 'src/app/models/customer.model';
import { Product } from 'src/app/models/product.model';
import { Transaction } from 'src/app/models/transaction.model';
import { AppState } from 'src/app/store';
import { fetchAllCustomers } from 'src/app/store/customer/customer.selectors';
import { fetchAllProducts } from 'src/app/store/product/product.selectors';
import { addTransaction } from 'src/app/store/transaction/transaction.actions';
import { fetchAllTransactions, fetchReturnableTrnsactions, isTransactionsLoading } from 'src/app/store/transaction/transaction.selectors';

@Component({
  selector: 'app-transactions-create',
  templateUrl: './transactions-create.component.html',
  styleUrls: ['./transactions-create.component.css']
})
export class TransactionsCreateComponent implements OnInit {

  transactions$: Observable<Transaction[]>;
  products$: Observable<Product[]>;
  customers$: Observable<Customer[]>;

  loading = false;
  customerId;
  productId;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select(isTransactionsLoading).subscribe((status) => {
      this.loading = status;
    });
    this.products$ = this.store.pipe(select(fetchAllProducts));
    this.transactions$ = this.store.pipe(select(fetchReturnableTrnsactions));
    this.customers$ = this.store.pipe(select(fetchAllCustomers));
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const transaction: Partial<Transaction> = form.value;
    this.store.dispatch(addTransaction({ transaction }));
  }

}
