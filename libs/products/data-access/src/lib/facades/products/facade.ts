import type { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Product } from '@fe-coding-challenge/products/types';
import { Store } from '@ngrx/store';
import type { Observable } from 'rxjs';
import { ProductsActions, ProductsSelectors, type State } from '../../+state';

@Injectable({ providedIn: 'root' })
export class ProductsFacade {
	public currentPage$: Observable<number> = this.store.select(
		ProductsSelectors.getCurrentPage
	);
	public error$: Observable<HttpErrorResponse | null> = this.store.select(
		ProductsSelectors.getError
	);
	public hasMoreResults$: Observable<boolean> = this.store.select(
		ProductsSelectors.getHasMoreResults
	);
	public isLoading$: Observable<boolean> = this.store.select(
		ProductsSelectors.getIsLoading
	);
	public products$: Observable<Product[]> = this.store.select(
		ProductsSelectors.getProducts
	);

	constructor(private readonly store: Store<State>) {}

	public dispatchLoadProducts(): void {
		this.store.dispatch(ProductsActions.load());
	}
}
