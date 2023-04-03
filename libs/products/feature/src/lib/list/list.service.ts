import type { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsFacade } from '@fe-coding-challenge/products/data-access';
import { combineLatest, map, type Observable } from 'rxjs';
import { ERROR_MESSAGES } from './list.constants';
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
		if (!error) {
			return;
		}

		return ERROR_MESSAGES[error.status as HttpStatusCode];
	}
}
