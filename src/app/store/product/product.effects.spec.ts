import { TestBed } from '@angular/core/testing';
import { EventType } from '@angular/router';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { provideMockActions } from '@ngrx/effects/testing';
import { routerNavigatedAction } from '@ngrx/router-store';
import { provideMockStore } from '@ngrx/store/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Observable, of } from 'rxjs';
import { ProductService } from 'src/app/products';
import * as ProductActions from '../product/product.actions';
import * as ProductSelectors from '../product/product.selectors';
import { ProductEffects } from './product.effects';
import { ProductState } from './product.reducer';

describe('ProductEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductEffects;
  let productServiceSpy: Spy<ProductService>;

  const initialState: ProductState = { productsPage: { content: [], more: false }, page: 0, isLoading: false, hasError: false };

  beforeEach(() => {
    productServiceSpy = createSpyFromClass(ProductService);

    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [
            {
              selector: ProductSelectors.selectPage,
              value: 0,
            },
          ],
        }),
        { provide: ProductService, useValue: productServiceSpy },
      ],
    });

    effects = TestBed.inject(ProductEffects);
  });

  it('should dispatch setIsLoading, resetProductsPage and loadProducts on router navigated to "/"', async () => {
    actions$ = of(routerNavigatedAction({
      payload: {
        routerState: {} as any,
        event: { url: '/', id: 1, type: EventType.NavigationEnd, urlAfterRedirects: '' }
      }
    }));
    const observerSpy = subscribeSpyTo(effects.loadInitialProducts$);

    await observerSpy.onComplete();

    expect(observerSpy.getValues()).toEqual([
      ProductActions.setIsLoading({ isLoading: true }),
      ProductActions.resetProductsPage(),
      ProductActions.loadProducts({ page: 0 }),
    ]);
  });

  it("should select the loading from store", () => {
    const result = ProductSelectors.selectIsLoading.projector(initialState);
    expect(result).toEqual(false);
  });

  it("should select the page from store", () => {
    const result = ProductSelectors.selectPage.projector(initialState);
    expect(result).toEqual(0);
  });

  it("should select the products page from store", () => {
    const result = ProductSelectors.selectProductsPage.projector(initialState);
    expect(result?.content).toEqual([]);
  });

  it('should dispatch loadProductsSuccess when loadProducts is triggered', async () => {
    const mockProductsPage = { content: [], more: false };
    productServiceSpy.get.and.returnValue(of(mockProductsPage));
    actions$ = of(ProductActions.loadProducts({ page: 0 }));
    const observerSpy = subscribeSpyTo(effects.loadProducts$);

    await observerSpy.onComplete();

    expect(observerSpy.getValues()).toEqual([
      ProductActions.setIsLoading({ isLoading: false }),
      ProductActions.loadProductsSuccess({ productsPage: mockProductsPage }),
    ]);
  });

  it('should dispatch setPage and loadMoreProductsSuccess when loadMoreProducts is triggered', async () => {
    const mockProductsPage = { content: [], more: false };
    productServiceSpy.get.and.returnValue(of(mockProductsPage));
    actions$ = of(ProductActions.loadMoreProducts());
    const observerSpy = subscribeSpyTo(effects.loadMoreProducts$);

    await observerSpy.onComplete();

    expect(observerSpy.getValues()).toEqual([
      ProductActions.setIsLoading({ isLoading: false }),
      ProductActions.setPage({ page: 1 }),
      ProductActions.loadMoreProductsSuccess({ productsPage: mockProductsPage }),
    ]);
  });

  it('should select the page from the store and call productService.get with incremented page', async () => {
    const mockProductsPage = { content: [], more: false };
    productServiceSpy.get.and.returnValue(of(mockProductsPage));

    actions$ = of(ProductActions.loadMoreProducts());

    const observerSpy = subscribeSpyTo(effects.loadMoreProducts$);

    await observerSpy.onComplete();

    expect(productServiceSpy.get).toHaveBeenCalledWith(1);
    expect(observerSpy.getValues()).toEqual([
      ProductActions.setIsLoading({ isLoading: false }),
      ProductActions.setPage({ page: 1 }),
      ProductActions.loadMoreProductsSuccess({ productsPage: mockProductsPage }),
    ]);
  });
});
