import type { HttpErrorResponse } from '@angular/common/http';
import type { Page, Product } from '@fe-coding-challenge/products/types';
import {
	createEntityAdapter,
	type EntityAdapter,
	type EntityState,
} from '@ngrx/entity';
import { type ActionReducer, createReducer, on } from '@ngrx/store';
import { ProductsActions } from '../actions';

export interface State extends EntityState<Product> {
	currentPage: number;
	error: HttpErrorResponse | null;
	hasMoreResults: boolean;
	isLoading: boolean;
}

export const productsAdapter: EntityAdapter<Product> =
	createEntityAdapter<Product>();

export const initialState: State = productsAdapter.getInitialState({
	currentPage: 0,
	error: null,
	hasMoreResults: true,
	isLoading: false,
});

export const reducer: ActionReducer<State> = createReducer(
	initialState,
	on(
		ProductsActions.get,
		(state: State): State => ({
			...state,
			error: null,
			isLoading: true,
		})
	),
	on(
		ProductsActions.getSuccess,
		(state: State, { data }: { data: Page<Product> }): State =>
			productsAdapter.addMany(data.content, {
				...state,
				currentPage: state.currentPage + 1,
				error: null,
				hasMoreResults: data.more,
				isLoading: false,
			})
	),
	on(
		ProductsActions.getFailure,
		(state: State, { error }: { error: HttpErrorResponse }): State => ({
			...state,
			error,
			isLoading: false,
		})
	)
);
