import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';
import { Product } from './models';
import { ProductsComponent } from './products.component';
import { ProductsState } from './states';

describe('ProductsComponent', () => {
  const INIT_PRODUCTS: Product[] = [
    { url: '', title: 'Product 1', description: 'Description', image: null, categories: [] },
  ];
  const ALL_PRODUCTS: Product[] = [
    ...INIT_PRODUCTS,
    { url: '', title: 'Product 2', description: 'Description', image: null, categories: [] },
    { url: '', title: 'Product 3', description: 'Description', image: null, categories: [] },
    { url: '', title: 'Product 4', description: 'Description', image: null, categories: [] },
  ];

  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let fakeState: jasmine.SpyObj<ProductsState>;

  beforeEach(async () => {
    fakeState = jasmine.createSpyObj<ProductsState>('ProductsState', {
      getProducts: of({ more: true, content: [] }),
      loadMoreProducts: of({ more: true, content: [] }),
    });

    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      providers: [{ provide: ProductsState, useValue: fakeState }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    component.isLoading$ = of(false);
    component.canLoadMore$ = of(false);
    component.errorMessage$ = of(undefined);
    component.products$ = of(INIT_PRODUCTS);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show the list of products', () => {
    const products = fixture.debugElement.queryAll(By.css('[data-testid="product"]'));

    expect(products.length).toBe(INIT_PRODUCTS.length);
  });

  describe('"Load more" button', () => {
    let button: DebugElement;

    it('should show', () => {
      component.canLoadMore$ = of(true);
      fixture.detectChanges();

      button = fixture.debugElement.query(By.css('[data-testid="load-more-button"]'));

      expect(button).toBeTruthy();
    });

    it('should hide', () => {
      component.canLoadMore$ = of(false);
      fixture.detectChanges();

      button = fixture.debugElement.query(By.css('[data-testid="load-more-button"]'));

      expect(button).toBeFalsy();
    });

    it('should load more products when clicked', () => {
      component.canLoadMore$ = of(true);
      component.products$ = of(ALL_PRODUCTS);
      fixture.detectChanges();

      button = fixture.debugElement.query(By.css('[data-testid="load-more-button"]'));
      button.triggerEventHandler('click', null);

      const products = fixture.debugElement.queryAll(By.css('[data-testid="product"]'));

      expect(fakeState.loadMoreProducts).toHaveBeenCalled();
      expect(products.length).toBe(ALL_PRODUCTS.length);
    });
  });

  describe('Page loader', () => {
    let pageLoader: DebugElement;

    it('should show', () => {
      component.isLoading$ = of(true);
      fixture.detectChanges();

      pageLoader = fixture.debugElement.query(By.css('[data-testid="page-loader"]'));

      expect(pageLoader).toBeTruthy();
    });

    it('should hide', () => {
      component.isLoading$ = of(false);
      fixture.detectChanges();

      pageLoader = fixture.debugElement.query(By.css('[data-testid="page-loader"]'));

      expect(pageLoader).toBeFalsy();
    });
  });

  describe('Error message', () => {
    let errorBox: DebugElement;

    it('should show', () => {
      component.errorMessage$ = of('Error');
      fixture.detectChanges();

      errorBox = fixture.debugElement.query(By.css('[data-testid="error-box"]'));

      expect(errorBox).toBeTruthy();
    });

    it('should hide', () => {
      component.errorMessage$ = of(undefined);
      fixture.detectChanges();

      errorBox = fixture.debugElement.query(By.css('[data-testid="error-box"]'));

      expect(errorBox).toBeFalsy();
    });
  });
});
