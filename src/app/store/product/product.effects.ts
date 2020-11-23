import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { AlertService } from '../../shared/alert/alert.service';
import { Router } from '@angular/router';
import * as ProductActions from './product.actions';
import { ProductService } from '../../services/product.service';

@Injectable()
export class ProductEffects {

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.addProduct),
      concatMap(action =>
        this.productService.create(action.product).pipe(
          map(response => {
            this.helperService.showSnackbar(response.message);
            if (response.status) {
              this.router.navigate(['dashboard', 'products']);
              return ProductActions.addProductSuccess({ product: response.data });
            } else {
              return ProductActions.addProductFailure({
                error: {
                  type: 'Invalid',
                  message: response.message
                }
              });
            }
          }),
          catchError(error => EMPTY)
        )
      )
    );
  });


  loadingProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadingProducts),
      concatMap((action) =>
        this.productService.getAll().pipe(
          map((response) => {
            if (response.status) {
              return ProductActions.loadProducts({ products: response.data });
            } else {
              return ProductActions.loadProducts({ products: [] });
            }
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private helperService: AlertService,
    private productService: ProductService,
    private router: Router
  ) {}
}
