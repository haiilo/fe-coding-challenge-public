import { type HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsFacade } from '@fe-coding-challenge/products/data-access';
import { combineLatest, map, type Observable } from 'rxjs';
import type { LatestCombinedData, ListData } from './list.types';

@Injectable()
export class ListService {
	public data$: Observable<ListData> = combineLatest([
		this.productsFacade.error$,
		this.productsFacade.hasMoreResults$,
		this.productsFacade.isLoading$,
		this.productsFacade.products$,
	]).pipe(
		map(([error, hasMoreResults, isLoading, data]: LatestCombinedData) => ({
			data,
			error: this.getErrorMessage(error),
			hasMoreResults,
			isLoading,
		}))
	);

	constructor(private readonly productsFacade: ProductsFacade) {}

	public dispatchLoadProducts(): void {
		this.productsFacade.dispatchLoadProducts();
	}

	private getErrorMessage(error: HttpErrorResponse | null): string | undefined {
		switch (error?.status) {
			case HttpStatusCode.InternalServerError:
				return "We have a problem! It's not you, it's us.\nTry getting new data by pressing below button or refreshing page! 💡";
			default:
				return;
		}
	}
}
