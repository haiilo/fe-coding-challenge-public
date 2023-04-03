import type { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import type { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import type { TestHotObservable } from 'jasmine-marbles/src/test-observables';
import { of } from 'rxjs';
import { ProductsFacade } from '../../../facades';
import { ProductsService } from '../../../services';
import { ProductsActions } from '../../actions';
import { ProductsEffects } from './effects';

export const mockError: HttpErrorResponse = {
	message: 'err',
} as HttpErrorResponse;

describe('ProductsEffects', () => {
	let actions$: Actions;
	let effects: ProductsEffects;
	let productsService: jest.Mocked<ProductsService>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ProductsFacade,
					useValue: {
						currentPage$: of(0),
						hasMoreResults$: of(true),
					},
				},
				{
					provide: ProductsService,
					useValue: {
						get: jest.fn(),
					},
				},
				ProductsEffects,
				provideMockActions(() => actions$),
			],
		});

		productsService = TestBed.inject(
			ProductsService
		) as jest.Mocked<ProductsService>;

		effects = TestBed.inject(ProductsEffects);
	});

	test('should dispatch get from load$', () => {
		actions$ = hot('-a---|', {
			a: ProductsActions.load(),
		});

		const expected: TestHotObservable = hot('-(a)-|', {
			a: ProductsActions.get(),
		});

		expect(effects.load$).toBeObservable(expected);
	});

	describe('get$', () => {
		test('should dispatch getSuccess', () => {
			productsService.get.mockReturnValue(of({ content: [], more: true }));

			actions$ = hot('-a|', {
				a: ProductsActions.get(),
			});

			const expected: TestHotObservable = hot('-a|', {
				a: ProductsActions.getSuccess({ data: { content: [], more: true } }),
			});

			expect(effects.get$).toBeObservable(expected);
		});

		test('should dispatch getFailure', () => {
			productsService.get.mockReturnValueOnce(
				cold('#', { a: 'test' }, mockError)
			);

			actions$ = hot('-a|', {
				a: ProductsActions.get(),
			});

			const expected: TestHotObservable = hot('-a|', {
				a: ProductsActions.getFailure({ error: mockError }),
			});

			expect(effects.get$).toBeObservable(expected);
		});
	});
});
