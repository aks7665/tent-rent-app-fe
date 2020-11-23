import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { ErrorForm } from '../../models/error-form.model';

// Fetch Products
export const loadingProducts = createAction(
  '[Product/Effect] Loading Products'
);
export const loadProducts = createAction(
  '[Product/Load All] Load Products',
  props<{ products: Product[] }>()
);

// Add Product
export const addProduct = createAction(
  '[Product/Effect] Add Product',
  props<{ product: Partial<Product> }>()
);
export const addProductFailure = createAction(
  '[Product/Error] Add Product Failure',
  props<{ error: ErrorForm }>()
);
export const addProductSuccess = createAction(
  '[Product/Success] Add Product Success',
  props<{ product: Product }>()
);

export const updateProduct = createAction(
  '[Product/Update] Update Product',
  props<{ product: Product }>()
);

export const clearProducts = createAction(
  '[Product] Clear Products'
);
