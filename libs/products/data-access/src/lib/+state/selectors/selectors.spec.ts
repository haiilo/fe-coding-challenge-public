import { initialState } from '../reducers';
import { FEATURE_KEY } from '../state.constants';
import {
	getCurrentPage,
	getError,
	getHasMoreResults,
	getIsLoading,
	getProducts,
} from './selectors';

describe('ProductsSelectors', () => {
	test('should return an correct value for currentPage', () => {
		expect(
			getCurrentPage({
				[FEATURE_KEY]: initialState,
			})
		).toStrictEqual(0);
	});

	test('should return null for error', () => {
		expect(
			getError({
				[FEATURE_KEY]: initialState,
			})
		).toStrictEqual(null);
	});

	test('should return true for hasMoreResults', () => {
		expect(
			getHasMoreResults({
				[FEATURE_KEY]: initialState,
			})
		).toStrictEqual(true);
	});

	test('should return false for isLoading', () => {
		expect(
			getIsLoading({
				[FEATURE_KEY]: initialState,
			})
		).toStrictEqual(false);
	});

	test('should return an empty array for products', () => {
		expect(
			getProducts({
				[FEATURE_KEY]: initialState,
			})
		).toStrictEqual([]);
	});
});
