import { Action, createReducer, on } from '@ngrx/store';
import * as CustomerActions from './customer.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Customer } from '../../models/customer.model';
import { ErrorForm } from '../../models/error-form.model';

export const customerFeatureKey = 'customer';

// tslint:disable-next-line: no-empty-interface
export interface State { }

export interface State extends EntityState<Customer> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
  error: ErrorForm;
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>({
  sortComparer: sortByName, // For sorting
  selectId: data => data._id
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false,
  error: undefined
});

const customerReducer = createReducer(
  initialState,
  on(CustomerActions.addCustomer, (state, action) => {
    return {
      ...state,
      loading: true,
      error: undefined
    };
  }),
  on(CustomerActions.addCustomerSuccess,
    (state, action) =>
      adapter.addOne(
        action.customer,
        { ...state, loading: false, loaded: false }
      ),
  ),
  on(CustomerActions.addCustomerFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    };
  }),
  on(CustomerActions.loadingCustomers, (state, action) => {
    return {
      ...state,
      loading: true,
      error: undefined,
      loaded: false
    };
  }),
  on(CustomerActions.loadCustomers,
    (state, action) => adapter.setAll(action.customers, { ...state, loading: false, loaded: true })
  ),
  on(CustomerActions.clearCustomers,
    (state, action) => adapter.removeAll({ ...state, loading: false, loaded: false, error: undefined })
  )
);

// Get all selectors - getEntities, getIds, getAll
export const select = adapter.getSelectors(); // Entitity Adapter Selector

export function sortByName(a: Customer, b: Customer): number {
  return a.name.localeCompare(b.name);
}

// tslint:disable-next-line: typedef
export function reducer(state: State | undefined, action: Action) {
  return customerReducer(state, action);
}
