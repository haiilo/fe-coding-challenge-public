import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ObserverSpy, subscribeSpyTo } from '@hirez_io/observer-spy';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideAutoSpy } from 'jasmine-auto-spies';
import { Product } from 'src/app/products';
import { ProductState } from 'src/app/store/product/product.reducer';
import * as ProductActions from '../../store/product/product.actions';
import * as ProductSelectors from '../../store/product/product.selectors';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let dispatchSpy: jasmine.Spy;
  let store: MockStore;
  let observerSpy: ObserverSpy<Product[] | undefined>;

  const productsContent = [
    {
      title: 'Product 1',
      image: null,
      categories: [],
      description: '',
      url: '',
    },
  ];
  const initialState: ProductState = { productsPage: { content: [], more: false }, page: 0, isLoading: false, hasError: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, StoreModule.forRoot({})],
      providers: [provideAutoSpy(Store), provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('product$ observable', () => {

    it('should output the correct products from products$ observable', () => {
      store.overrideSelector(ProductSelectors.selectProductsPage, {
        content: productsContent,
        more: true,
      });
      observerSpy = subscribeSpyTo(component.products$);

      const products = observerSpy.getLastValue();

      expect(products).toEqual([
        {
          title: 'Product 1',
          image: null,
          categories: [],
          description: '',
          url: '',
        },
      ]);
    });
  });

  describe('canLoadMore()', () => {
    it('should be able to load more when product page can provide more products', () => {
      store.overrideSelector(ProductSelectors.selectProductsPage, {
        content: productsContent,
        more: true,
      });
      observerSpy = subscribeSpyTo(component.products$);

      observerSpy.getLastValue();

      expect(component.canLoadMore()).toEqual(true);
    });

    it('should not be able to load more when product page cant provide any more products', () => {
      store.overrideSelector(ProductSelectors.selectProductsPage, {
        content: productsContent,
        more: false,
      });
      observerSpy = subscribeSpyTo(component.products$);

      observerSpy.getLastValue();

      expect(component.canLoadMore()).toEqual(false);
    });

    it('should not be able to load more when product page is undefined', () => {
      store.overrideSelector(ProductSelectors.selectProductsPage, undefined);
      observerSpy = subscribeSpyTo(component.products$);

      observerSpy.getLastValue();

      expect(component.canLoadMore()).toEqual(false);
    });
  });

  it('should dispatch loadMoreProducts action when loadMore button is pressed', fakeAsync(() => {
    component.canLoadMore.set(true);

    tick();
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.products__button'));
    el.nativeElement.click();

    expect(dispatchSpy).toHaveBeenCalledWith(ProductActions.loadMoreProducts());
  }));

  it('should calculate lastRowExtraCount corectly', () => {

    let lastRowExtraCount = (component as any).getLastRowExtraCount(5, 952, 305);
    expect(lastRowExtraCount).toEqual(1);

    lastRowExtraCount = (component as any).getLastRowExtraCount(5, 1256, 302);
    expect(lastRowExtraCount).toEqual(3);
  });
});
