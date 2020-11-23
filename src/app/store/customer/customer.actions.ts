import { createAction, props } from '@ngrx/store';
import { Customer } from '../../models/customer.model';
import { ErrorForm } from '../../models/error-form.model';

// Fetch Customers
export const loadingCustomers = createAction(
  '[Customer/Effect] Loading Customers'
);
export const loadCustomers = createAction(
  '[Customer/Load All] Load Customers',
  props<{ customers: Customer[] }>()
);

// Add Customer
export const addCustomer = createAction(
  '[Customer/Effect] Add Customer',
  props<{ customer: Partial<Customer> }>()
);
export const addCustomerFailure = createAction(
  '[Customer/Error] Add Customer Failure',
  props<{ error: ErrorForm }>()
);
export const addCustomerSuccess = createAction(
  '[Customer/Success] Add Customer Success',
  props<{ customer: Customer }>()
);

export const clearCustomers = createAction(
  '[Customer] Clear Customers'
);
