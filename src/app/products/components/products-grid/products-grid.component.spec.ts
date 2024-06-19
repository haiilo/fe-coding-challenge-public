import {ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {delay, of, throwError} from "rxjs";
import {ProductComponent} from "src/app/products/components/product/product.component";
import {ProductService} from "src/app/products/services/product.service";
import {ProductsGridComponent} from './products-grid.component';

describe('ProductsGridComponent', () => {
  let component: ProductsGridComponent;
  let fixture: ComponentFixture<ProductsGridComponent>;
  let mockProductService: any;

  beforeEach(fakeAsync(() => {
    mockProductService = jasmine.createSpyObj('ProductService', ['get']);
    mockProductService.get.and.returnValue(of({ more: true, content: [{ id: 1, title: 'Product 1' }] }).pipe(delay(100)));

    TestBed.configureTestingModule({
      declarations: [ProductsGridComponent, ProductComponent],
      providers: [{ provide: ProductService, useValue: mockProductService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick(100);
  }));

  function loadAndWaitForPage() {
    component.loadMore();
    tick(100);
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the "Load more" button when canLoadMore is false', fakeAsync(() => {
    component.canLoadMore$.next(false);
    fixture.detectChanges();
    tick();

    const button = fixture.nativeElement.querySelector('.more');
    expect(button.disabled).toBeTrue();
  }));

  it('should display an error message when a product load fails', fakeAsync(() => {
    mockProductService.get.and.returnValue(throwError(() => new Error('Failed to load products')));
    loadAndWaitForPage();

    const toast = fixture.nativeElement.querySelector('.toasts .toast.danger');
    expect(toast).toBeTruthy();
    expect(toast.textContent).toContain('Something went kaput. Please try again later.');
  }));

  it('should load multiple pages of products and update the UI', fakeAsync(() => {
    let callCount = 0;

    mockProductService.get.and.callFake(() => of({
      more: callCount++ < 1,
      content: [{ id: callCount, title: `Product ${callCount}` }]
    }).pipe(delay(100)));

    loadAndWaitForPage(); // Load first page
    loadAndWaitForPage(); // Load second page

    const products = fixture.nativeElement.querySelectorAll('app-product')

    expect(products.length).toBe(3);
    expect(products[2].querySelector('h3').textContent).toEqual('Product 2');
  }));

  it('should have a disabled more products button when "more" is false', fakeAsync(() => {
    mockProductService.get.and.returnValue(of({ more: false, content: [{ id: 4, title: 'Product 4' }] }).pipe(delay(100)));
    loadAndWaitForPage();

    component.canLoadMore$.subscribe(canLoadMore => {
      expect(canLoadMore).toBeFalse();
    });

    const button = fixture.nativeElement.querySelector('.more');
    expect(button.disabled).toBeTrue();
  }));

  it('should show a spinner when loading products', fakeAsync(() => {
    component.loadMore();
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('.spinner');
    expect(spinner).toBeTruthy();
    discardPeriodicTasks();
  }));
});
