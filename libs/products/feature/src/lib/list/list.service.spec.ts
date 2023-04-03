import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ProductsFacade } from '@fe-coding-challenge/products/data-access';
import { of } from 'rxjs';
import { ERROR_MESSAGES } from './list.constants';
import { ListService } from './list.service';
import type { ListData } from './list.types';

describe('ListService', () => {
	let productsFacade: jest.Mocked<ProductsFacade>;
	let service: ListService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ProductsFacade,
					useValue: {
						dispatchLoadProducts: jest.fn(),
						error$: of(null),
						hasMoreResults$: of(true),
						isLoading$: of(false),
						products$: of([]),
					},
				},
				ListService,
			],
		});

		productsFacade = TestBed.inject(
			ProductsFacade
		) as jest.Mocked<ProductsFacade>;
	});

	function initService(): void {
		service = TestBed.inject(ListService);
	}

	describe('data$', () => {
		test('should set data correctly', (done: jest.DoneCallback) => {
			productsFacade.products$ = of([]);
			initService();
			service.data$.subscribe((data: ListData) => {
				expect(data.data).toStrictEqual([]);
				done();
			});
		});

		describe('error', () => {
			test('should be undefined', (done: jest.DoneCallback) => {
				productsFacade.error$ = of(null);
				initService();
				service.data$.subscribe((data: ListData) => {
					expect(data.error).toBe(undefined);
					done();
				});
			});

			test('should be correct value', (done: jest.DoneCallback) => {
				productsFacade.error$ = of(
					new HttpErrorResponse({
						status: HttpStatusCode.InternalServerError,
					})
				);
				initService();
				service.data$.subscribe((data: ListData) => {
					expect(data.error).toBe(
						ERROR_MESSAGES[HttpStatusCode.InternalServerError]
					);
					done();
				});
			});
		});

		describe('hasMoreResults', () => {
			test('should be true', (done: jest.DoneCallback) => {
				productsFacade.hasMoreResults$ = of(true);
				initService();
				service.data$.subscribe((data: ListData) => {
					expect(data.hasMoreResults).toBe(true);
					done();
				});
			});

			test('should be false', (done: jest.DoneCallback) => {
				productsFacade.hasMoreResults$ = of(false);
				initService();
				service.data$.subscribe((data: ListData) => {
					expect(data.hasMoreResults).toBe(false);
					done();
				});
			});
		});

		describe('isLoading', () => {
			test('should be true', (done: jest.DoneCallback) => {
				productsFacade.isLoading$ = of(true);
				initService();
				service.data$.subscribe((data: ListData) => {
					expect(data.isLoading).toBe(true);
					done();
				});
			});

			test('should be false', (done: jest.DoneCallback) => {
				productsFacade.isLoading$ = of(false);
				initService();
				service.data$.subscribe((data: ListData) => {
					expect(data.isLoading).toBe(false);
					done();
				});
			});
		});
	});

	describe('dispatches', () => {
		test('should call load products dispatch', () => {
			initService();
			service.dispatchLoadProducts();
			expect(productsFacade.dispatchLoadProducts).toHaveBeenCalled();
		});
	});
});
