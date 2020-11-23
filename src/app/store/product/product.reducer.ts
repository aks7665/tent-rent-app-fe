import { Action, createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../../models/product.model';
import { ErrorForm } from '../../models/error-form.model';

export const productFeatureKey = 'product';

// tslint:disable-next-line: no-empty-interface
export interface State { }

export interface State extends EntityState<Product> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
  error: ErrorForm;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  sortComparer: sortByTitle, // For sorting
  selectId: data => data._id
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false,
  error: undefined
});

const productReducer = createReducer(
  initialState,
  on(ProductActions.addProduct, (state, action) => {
    return {
      ...state,
      loading: true,
      error: undefined
    };
  }),
  on(ProductActions.addProductSuccess,
    (state, action) =>
      adapter.addOne(
        action.product,
        { ...state, loading: false, loaded: false }
      ),
  ),
  on(ProductActions.addProductFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    };
  }),
  on(ProductActions.updateProduct,
    (state, action) => {
      return adapter.updateOne(
        {
          id: action.product._id,
          changes: action.product
        },
        {...state, loading: false, loaded: true}
      );
    }
  ),
  on(ProductActions.loadingProducts, (state, action) => {
    return {
      ...state,
      loading: true,
      error: undefined,
      loaded: false
    };
  }),
  on(ProductActions.loadProducts,
    (state, action) => adapter.setAll(action.products, { ...state, loading: false, loaded: true })
  ),
  on(ProductActions.clearProducts,
    (state, action) => adapter.removeAll({ ...state, loading: false, loaded: false, error: undefined })
  )
);

// Get all selectors - getEntities, getIds, getAll
export const select = adapter.getSelectors(); // Entitity Adapter Selector

export function sortByTitle(a: Product, b: Product): number {
  return a.title.localeCompare(b.title);
}

// tslint:disable-next-line: typedef
export function reducer(state: State | undefined, action: Action) {
  return productReducer(state, action);
}
