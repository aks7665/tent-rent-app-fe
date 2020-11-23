import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProduct from './product.reducer';

export const selectProductsState = createFeatureSelector<fromProduct.State>(
  fromProduct.productFeatureKey
);

export const isProductsLoading = createSelector(
  selectProductsState,
  (state) => state.loading
);

export const isProductsLoaded = createSelector(
  selectProductsState,
  (state) => state.loaded
);

export const fetchProductError = createSelector(
  selectProductsState,
  (state) => state.error
);

export const fetchAllProducts = createSelector(
  selectProductsState,
  fromProduct.select.selectAll
);

