import type { HttpErrorResponse } from '@angular/common/http';
import type { Product } from '@fe-coding-challenge/products/types';

export type LatestCombinedData = [
	HttpErrorResponse | null,
	boolean,
	boolean,
	Product[]
];

export interface ListData {
	data: Product[];
	error?: string;
	hasMoreResults: boolean;
	isLoading: boolean;
}
