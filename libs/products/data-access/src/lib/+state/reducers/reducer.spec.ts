import type { HttpErrorResponse } from '@angular/common/http';
import { ProductsActions } from '../actions';
import { initialState, reducer, type State } from './reducer';

export const mockError: HttpErrorResponse = {
	message: 'err',
} as HttpErrorResponse;

describe('productsReducer', () => {
	test('should return the initial state', () => {
		expect(reducer(initialState, { type: '' })).toStrictEqual(initialState);
	});

	test('should set the error and isLoading on get', () => {
		const result: State = reducer(initialState, ProductsActions.get());

		expect(result.error).toBe(null);
		expect(result.isLoading).toBe(true);
	});

	test('should set the products on getSuccess', () => {
		const result: State = reducer(
			initialState,
			ProductsActions.getSuccess({
				data: {
					content: [],
					more: false,
				},
			})
		);

		expect(result.currentPage).toBe(1);
		expect(result.error).toBe(null);
		expect(result.hasMoreResults).toBe(false);
		expect(result.ids).toStrictEqual([]);
		expect(result.isLoading).toBe(false);
	});

	test('should set the error and isLoading on getFailure', () => {
		const result: State = reducer(
			initialState,
			ProductsActions.getFailure({ error: mockError })
		);

		expect(result.error).toBe(mockError);
		expect(result.isLoading).toBe(false);
	});
});
