import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Page, Product } from '@fe-coding-challenge/products/types';
import {
	randNumber,
	randProductCategory,
	randProductDescription,
	randProductName,
	randUrl,
	randUuid,
} from '@ngneat/falso';
import { delay, type Observable, of, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	private readonly PAGE_SIZE: number = 12;
	private readonly PAGE_COUNT: number = 4;
	private readonly PAGE_ERROR: number = 0.1;
	private readonly TRUE_WEIGHT: number = 0.8;

	/**
	 * Get a page of products.
	 *
	 * *Note:* This is a fake service that returns random data. It simulates a
	 * network request by delaying the response and randomly returning an error.
	 *
	 * @param page The page number.
	 * @returns An observable of the page of products.
	 */
	public get(page: number): Observable<Page<Product>> {
		let res: Page<Product> | undefined;
		if (page > this.PAGE_COUNT) {
			res = { content: [], more: false };
		} else if (page === this.PAGE_COUNT) {
			res = {
				content: this.getContent(
					randNumber({
						max: this.PAGE_SIZE,
						min: 1,
					})
				),
				more: false,
			};
		} else if (page >= 0) {
			res = {
				content: this.getContent(this.PAGE_SIZE),
				more: true,
			};
		}

		if (res) {
			return (
				this.randBooleanWeighted(this.PAGE_ERROR)
					? throwError(
							() =>
								new HttpErrorResponse({
									status: 500,
									statusText: 'Internal Server Error',
								})
					  )
					: of(res)
			).pipe(delay(randNumber({ max: 1500, min: 150 })));
		}

		return throwError(
			() =>
				new HttpErrorResponse({
					status: 400,
					statusText: 'Bad Request',
				})
		);
	}

	private getContent(length: number): Product[] {
		return Array.from({ length }, () => ({
			categories: Array.from(
				{
					length: randNumber({ max: 5 }),
				},
				() => randProductCategory()
			),
			description: randProductDescription(),
			id: randUuid(),
			image: this.randBooleanWeighted(this.TRUE_WEIGHT)
				? `https://picsum.photos/id/${randNumber({ max: 1000 })}/400/400`
				: null,
			title: randProductName(),
			url: randUrl(),
		}));
	}

	private randBooleanWeighted(trueWeight: number): boolean {
		return randNumber({ fraction: 2, max: 1 }) <= trueWeight;
	}
}
