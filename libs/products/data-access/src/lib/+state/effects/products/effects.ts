import type { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Page, Product } from '@fe-coding-challenge/products/types';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { ProductsFacade } from '../../../facades';
import { ProductsService } from '../../../services';
import { ProductsActions } from '../../actions';

@Injectable()
export class ProductsEffects {
	public load$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ProductsActions.load),
			concatLatestFrom(() => this.productsFacade.hasMoreResults$),
			filter(([, hasMoreResults]) => !!hasMoreResults),
			map(() => ProductsActions.get())
		)
	);

	public get$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ProductsActions.get),
			concatLatestFrom(() => this.productsFacade.currentPage$),
			switchMap(([, currentPage]) =>
				this.productsService.get(currentPage).pipe(
					map((data: Page<Product>) => ProductsActions.getSuccess({ data })),
					catchError((error: HttpErrorResponse) =>
						of(ProductsActions.getFailure({ error }))
					)
				)
			)
		)
	);

	constructor(
		private readonly actions$: Actions,
		private readonly productsFacade: ProductsFacade,
		private readonly productsService: ProductsService
	) {}
}
