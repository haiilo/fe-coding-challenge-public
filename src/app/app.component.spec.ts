import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { ProductStateService } from './products/product-state.service';
import { Product } from './products/product';
import { ProductCardComponent } from './products/components/product-card/product-card/product-card.component';

class MockProductStateService {
  _products$ = new BehaviorSubject<Product[]>([]);
  _loading$ = new BehaviorSubject<boolean>(false);
  _error$ = new BehaviorSubject<string | null>(null);
  _more$ = new BehaviorSubject<boolean>(true);

  products$ = this._products$.asObservable();
  loading$ = this._loading$.asObservable();
  error$ = this._error$.asObservable();
  more$ = this._more$.asObservable();

  loadMore() {
    this._loading$.next(true);
    setTimeout(() => {
      const newProducts: Product[] = [
        { url: 'http://example.com/2', title: 'Product 2', description: 'Description 2', image: 'http://example.com/image2.jpg', categories: ['Category2'] }
      ];
      this._products$.next(this._products$.getValue().concat(newProducts));
      this._loading$.next(false);
      this._more$.next(false);
    }, 1000);
  }

  triggerError() {
    this._loading$.next(false);
    this._error$.next('Error loading products');
  }

  returnNoData() {
    this._loading$.next(false);
    this._more$.next(false);
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let productStateService: MockProductStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ProductCardComponent],
      providers: [
        { provide: ProductStateService, useClass: MockProductStateService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    productStateService = TestBed.inject(ProductStateService) as unknown as MockProductStateService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call ProductStateService.loadMore method when loadMore is called', () => {
    spyOn(productStateService, 'loadMore').and.callThrough();

    component.loadMore();

    expect(productStateService.loadMore).toHaveBeenCalled();
  });

  it('should disable "Load more" button when loading', fakeAsync(() => {
    productStateService._loading$.next(true);
    fixture.detectChanges();
    tick();

    const buttonElement = fixture.debugElement.query(By.css('.more')).nativeElement;
    expect(buttonElement.disabled).toBeTrue();
  }));

  it('should show "Loading..." text on button when loading', fakeAsync(() => {
    productStateService._loading$.next(true);
    fixture.detectChanges();
    tick();

    const buttonElement = fixture.debugElement.query(By.css('.more')).nativeElement;
    expect(buttonElement.textContent).toContain('Loading...');
  }));

  it('should show "Load more" text on button when not loading', fakeAsync(() => {
    productStateService._loading$.next(false);
    fixture.detectChanges();
    tick();

    const buttonElement = fixture.debugElement.query(By.css('.more')).nativeElement;
    expect(buttonElement.textContent).toContain('Load more');
  }));

  it('should show "Try again" text on button when there is an error', fakeAsync(() => {
    productStateService.triggerError();
    fixture.detectChanges();
    tick();

    const buttonElement = fixture.debugElement.query(By.css('.more')).nativeElement;
    expect(buttonElement.textContent).toContain('Try again');
  }));

  it('should show error message when there is an error', fakeAsync(() => {
    const errorMessage = 'Error loading products';
    productStateService._error$.next(errorMessage);
    fixture.detectChanges();
    tick();

    const errorElement = fixture.debugElement.query(By.css('.error')).nativeElement;
    expect(errorElement.textContent).toContain(errorMessage);
  }));

  it('should load additional products when "Load more" button is clicked', fakeAsync(() => {
    const initialProducts: Product[] = [
      { url: 'http://example.com/1', title: 'Product 1', description: 'Description 1', image: 'http://example.com/image1.jpg', categories: ['Category1'] },
      { url: 'http://example.com/2', title: 'Product 2', description: 'Description 2', image: 'http://example.com/image2.jpg', categories: ['Category2'] }
    ];

    productStateService._products$.next(initialProducts);
    fixture.detectChanges();
    tick();

    const buttonElement = fixture.debugElement.query(By.css('.more')).nativeElement;
    buttonElement.click();
    tick(1000);

    fixture.detectChanges();
    tick();

    const productElements = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(productElements.length).toBe(2);
  }));

  it('should hide "Load more" button when service returns no data', fakeAsync(() => {
    productStateService.returnNoData();
    fixture.detectChanges();
    tick();

    const buttonElement = fixture.debugElement.query(By.css('.more'));
    expect(buttonElement).toBeNull();
  }));
});
