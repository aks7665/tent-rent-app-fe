import { createAction, props } from '@ngrx/store';
import { Customer } from 'src/app/models/customer.model';
import { Product } from 'src/app/models/product.model';

export const initialize = createAction(
  '[Initialize] Initialize',
);

export const initializeSuccess = createAction(
  '[Initialize] Initialize Success',
  props<{ customers: Customer[], products: Product[] }>()
);
