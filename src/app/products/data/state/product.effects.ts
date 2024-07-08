import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductActions } from "./action-types";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { ProductService } from "../services/product.service";
import { Product } from "../../../shared/models/product";
import { Page } from "../../../shared/models/page";
import { ToastrService } from "ngx-toastr";

export const getProducts = createEffect(
  (actions$ = inject(Actions), service = inject(ProductService)) => {
    return actions$.pipe(
      ofType(ProductActions.getProducts),
      exhaustMap((action) =>
        service.get(action.page).pipe(
          map((products: Page<Product>) => ProductActions.getProductsSuccess({ products })),
          catchError((error: Error) => of(ProductActions.getProductsFailed({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const displayError = createEffect(
  (toastr = inject(ToastrService)) => {
    return inject(Actions).pipe(
      ofType(ProductActions.getProductsFailed.type),
      tap((error: ErrorEvent) => {
        toastr.error(error.error.message)
      })
    )
  },
  { functional: true, dispatch: false }
);
