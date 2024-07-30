import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  routerNavigatedAction
} from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { catchError, filter, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { ProductService } from 'src/app/products';
import * as ProductActions from '../product/product.actions';
import * as ProductSelectors from '../product/product.selectors';

@Injectable()
export class ProductEffects {
  loadInitialProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter((action) => action.payload.event.url === '/'),
      switchMap(() => [
        ProductActions.setIsLoading({ isLoading: true }),
        ProductActions.resetProductsPage(),
        ProductActions.loadProducts({ page: 0 })
      ])
    )
  );

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap((payload) =>
        this.productService
          .get(payload.page)
          .pipe(
            catchError(err => {
              this.store.dispatch(ProductActions.setProductsError({ err }));
              return of({ content: [], more: false });
            }),
            mergeMap((response) => [
              ProductActions.setIsLoading({ isLoading: false }),
              ProductActions.loadProductsSuccess({ productsPage: response })
              ]
            )
          )
      )
    )
  );

  loadMoreProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadMoreProducts),
      withLatestFrom(this.store.select(ProductSelectors.selectPage)),
      tap(() => this.store.dispatch(ProductActions.setIsLoading({ isLoading: true }))),
      map(([_, page]) => (page + 1)),
      switchMap((page) =>
        this.productService
          .get(page)
          .pipe(
            catchError(err => {
              this.store.dispatch(ProductActions.setProductsError({ err }));
              return of({ content: [], more: false });
            }),
            mergeMap((response) => [
              ProductActions.setIsLoading({ isLoading: false }),
              ProductActions.setPage({ page }),
              ProductActions.loadMoreProductsSuccess({ productsPage: response })
            ])
          )
      )
    )
  );

  loadProductsError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.setProductsError),
      tap(payload => this.snackBar.open(payload.err, 'Close')),
      switchMap(() => of(ProductActions.setHasError({ value: true })))
    )
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private productService: ProductService
  ) {}
}
