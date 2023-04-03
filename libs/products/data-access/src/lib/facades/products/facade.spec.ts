import type { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import type { Product } from '@fe-coding-challenge/products/types';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ProductsActions, ProductsSelectors } from '../../+state';
import { ProductsFacade } from './facade';

describe('ProductsFacade', () => {
	let service: ProductsFacade;
	let store: MockStore<unknown>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ProductsFacade, provideMockStore()],
		});

		store = TestBed.inject(MockStore);
		store.dispatch = jest.fn();
		service = TestBed.inject(ProductsFacade);
	});

	test('should return the currentPage', (done: jest.DoneCallback) => {
		store.overrideSelector(ProductsSelectors.getCurrentPage, 0);
		service.currentPage$.subscribe((data: number) => {
			expect(data).toStrictEqual(0);
			done();
		});
	});

	test('should return the error', (done: jest.DoneCallback) => {
		store.overrideSelector(ProductsSelectors.getError, null);
		service.error$.subscribe((data: HttpErrorResponse | null) => {
			expect(data).toStrictEqual(null);
			done();
		});
	});

	test('should return the hasMoreResults', (done: jest.DoneCallback) => {
		store.overrideSelector(ProductsSelectors.getHasMoreResults, false);
		service.hasMoreResults$.subscribe((data: boolean) => {
			expect(data).toStrictEqual(false);
			done();
		});
	});

	test('should return the isLoading', (done: jest.DoneCallback) => {
		store.overrideSelector(ProductsSelectors.getIsLoading, false);
		service.isLoading$.subscribe((data: boolean) => {
			expect(data).toStrictEqual(false);
			done();
		});
	});

	test('should return the products', (done: jest.DoneCallback) => {
		store.overrideSelector(ProductsSelectors.getProducts, []);
		service.products$.subscribe((data: Product[]) => {
			expect(data).toStrictEqual([]);
			done();
		});
	});

	test('should call dispatchLoadProducts', () => {
		service.dispatchLoadProducts();
		expect(store.dispatch).toHaveBeenCalledWith(ProductsActions.load());
	});
});
