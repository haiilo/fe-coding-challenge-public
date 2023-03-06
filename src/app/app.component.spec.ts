import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

import { AppComponent } from './app.component';
import { ProductService } from './products/product.service';
import { Product } from './products/product';
import { ProductCardComponent } from './product-card/product-card.component';

class MockProductService {
  constructor() { }

  get() {}
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let productService: ProductService;
  let mockProductData: Product = {
    title: 't',
    description: 'd',
    image: 'i',
    url: 'u',
    categories: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, ProductCardComponent],
      providers: [
        {
          provides: ProductService,
          useClass: MockProductService,
        },
      ],
    }).compileComponents();
    productService = TestBed.inject(ProductService);
  });

  function spyOnProductGetAndReturnData(more = true) {
    spyOn(productService, 'get').and.returnValue(
      of({
        content: [mockProductData],
        more,
      })
    );
  }

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  // fetching data and rendering

  it('should call loadData upon initial render', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    const loadDataSpy = spyOn(component, 'loadData');
    fixture.detectChanges();

    expect(loadDataSpy).toHaveBeenCalledTimes(1);
  });

  it('should renders product cards if loadData fetches successfully', () => {
    fixture = TestBed.createComponent(AppComponent);
    const { debugElement } = fixture;
    component = fixture.componentInstance;
    spyOnProductGetAndReturnData();
    fixture.detectChanges();
    const elements = debugElement.queryAll(By.css('.product-card'));

    expect(elements.length).toBe(1);
  });

  // load more

  it('should append cards to already existing cards upon loading more', () => {
    fixture = TestBed.createComponent(AppComponent);
    const { debugElement } = fixture;
    component = fixture.componentInstance;
    spyOnProductGetAndReturnData();
    component.loadData();
    fixture.detectChanges();
    const elements = debugElement.queryAll(By.css('.product-card'));

    expect(elements.length).toBe(2);
  });

  it('should call loadMore upon clicking the Load More button', () => {
    fixture = TestBed.createComponent(AppComponent);
    const { debugElement } = fixture;
    component = fixture.componentInstance;
    const loadDataSpy = spyOn(component, 'loadData');
    fixture.detectChanges();
    const loadMoreButton = debugElement.nativeElement.querySelector('.more');
    loadMoreButton.click();

    expect(loadDataSpy).toHaveBeenCalledTimes(2); // first time on component init, second time by click
  });

  it('should reset the error state upon clicking the Load More button', async () => {
    fixture = TestBed.createComponent(AppComponent);
    const { debugElement } = fixture;
    component = fixture.componentInstance;
    component.fetchFailed = true;
    fixture.detectChanges();
    spyOnProductGetAndReturnData();
    const loadMoreButton = debugElement.nativeElement.querySelector('.more');
    loadMoreButton.click();
    fixture.detectChanges();

    expect(component.fetchFailed).toBeFalse();
  });

  it('should increase the page number if loadData fetches successfully', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.currentPage = 1;
    spyOnProductGetAndReturnData();
    component.loadData();
    fixture.detectChanges();

    expect(component.currentPage).toBe(2);
  });

  it('should have the Load More button disabled while fetching in progress', () => {
    fixture = TestBed.createComponent(AppComponent);
    const { debugElement } = fixture;
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.isFetchingData = true;
    fixture.detectChanges();
    const loadMoreButton = debugElement.nativeElement.querySelector('.more');
    expect(loadMoreButton.disabled).toBeTrue();
  });

  it('should set isFetchingData to false upon successful fetch', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.isFetchingData = true;
    component.currentPage = 1;
    spyOnProductGetAndReturnData();
    component.loadData();
    fixture.detectChanges();

    expect(component.isFetchingData).toBeFalse();
  });

  // pagination button and state

  it('should show "no more pages" message when fetch response includes "no more pages" part', () => {
    fixture = TestBed.createComponent(AppComponent);
    const { debugElement } = fixture;
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOnProductGetAndReturnData(false);
    component.loadData();
    fixture.detectChanges();

    const element = debugElement.query(By.css('.no-more-products'));
    expect(element).toBeTruthy();
  });

  it('should not show "no more pages" message when fetch response does not include "no more pages" part', () => {
    fixture = TestBed.createComponent(AppComponent);
    const { debugElement } = fixture;
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOnProductGetAndReturnData();
    component.loadData();
    fixture.detectChanges();

    const element = debugElement.query(By.css('.no-more-products'));
    expect(element).toBeFalsy();
  });

  it('should show the "Load More" button when there are more pages', () => {
    fixture = TestBed.createComponent(AppComponent);
    const { debugElement } = fixture;
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOnProductGetAndReturnData();
    component.loadData();
    fixture.detectChanges();

    const element = debugElement.query(By.css('.more'));
    expect(element).toBeTruthy();
  });

  it('should hide the "Load More" button when no more pages', () => {
    fixture = TestBed.createComponent(AppComponent);
    const { debugElement } = fixture;
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOnProductGetAndReturnData(false);
    component.loadData();
    fixture.detectChanges();

    const element = debugElement.query(By.css('.more'));
    expect(element).toBeFalsy();
  });

  // error when fetching

  it('should set fetchFailed to true if loadData fetch errors', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.fetchFailed = false;
    fixture.detectChanges();
    spyOn(productService, 'get').and.returnValue(throwError(() => new Error()));
    component.loadData();
    fixture.detectChanges();

    expect(component.fetchFailed).toBeTrue();
  });

  it('should not increase the page number if loadData fetch errors', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.currentPage = 1;
    fixture.detectChanges();
    spyOn(productService, 'get').and.returnValue(throwError(() => new Error()));
    component.loadData();
    fixture.detectChanges();

    expect(component.currentPage).toBe(1);
  });

  it('should display the error message on screen when error fetching', () => {
    fixture = TestBed.createComponent(AppComponent);
    const { debugElement } = fixture;
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.fetchFailed = true;
    fixture.detectChanges();

    const element = debugElement.query(By.css('.fetch-error'));
    expect(element).toBeTruthy();
  });
});
