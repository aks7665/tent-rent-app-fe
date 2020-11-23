import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Customer } from 'src/app/models/customer.model';
import { AppState } from 'src/app/store';
import { addCustomer } from 'src/app/store/customer/customer.actions';
import { isCustomersLoading } from 'src/app/store/customer/customer.selectors';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  loading = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select(isCustomersLoading).subscribe((status) => {
      this.loading = status;
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const customer: Partial<Customer> = form.value;
    this.store.dispatch(addCustomer({ customer }));
  }

}
