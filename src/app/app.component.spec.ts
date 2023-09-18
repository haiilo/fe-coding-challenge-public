import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from './products/product.service';
import { first, of } from 'rxjs';
import { productPage1Mock, productPage2Mock } from './products/product-page-mock';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let productServiceMock: jasmine.SpyObj<ProductService>;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    productServiceMock = jasmine.createSpyObj('productServiceMock', {
      get: of(productPage1Mock)
    });

    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      declarations: [AppComponent],
      providers: [{provide: ProductService, useValue: productServiceMock}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call ProductService get with 0 page', () => {
    expect(productServiceMock.get).toHaveBeenCalledWith(0);
  });

  it('should set correct data to products$ property', (done) => {
    component.products$
      .pipe(first())
      .subscribe((data) => {
        expect(data).toEqual(productPage1Mock);
        done();
      });
  });

  it('should load first page of products', (done) => {
    fixture.whenStable().then(() => {
      const cards = fixture.debugElement.queryAll(By.css('.product-card'));
      expect(cards.length).toBe(productPage1Mock.content.length);
    });
    done();
  });

  it('displays load more button', () => {
    const loadMoreBtn = fixture.debugElement.query(By.css('.more'));
    expect(loadMoreBtn).toBeTruthy();
  });

  it('should set correct data to products$ property after load more click', (done) => {
    productServiceMock.get.withArgs(1).and.returnValue(of(productPage2Mock));
    const loadMoreBtn = fixture.debugElement.query(By.css('.more')).nativeElement;

    loadMoreBtn.click();
    fixture.detectChanges();

    component.products$
      .pipe(first())
      .subscribe((data) => {
        expect(data).toEqual({
          content: [...productPage1Mock.content, ...productPage2Mock.content],
          more: productPage2Mock.more,
        });
        done();
      });
  });

  it('loads second page after click to load more btn', (done) => {
    productServiceMock.get.withArgs(1).and.returnValue(of(productPage2Mock));
    const loadMoreBtn = fixture.debugElement.query(By.css('.more')).nativeElement;

    loadMoreBtn.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const cards = fixture.debugElement.queryAll(By.css('.product-card'));
      expect(cards.length).toBe(productPage1Mock.content.length + productPage2Mock.content.length);
    });
    done();
  });

  it('hides load more btn after click to load more btn', (done) => {
    productServiceMock.get.withArgs(1).and.returnValue(of(productPage2Mock));
    const loadMoreBtn = fixture.debugElement.query(By.css('.more')).nativeElement;

    loadMoreBtn.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const loadMoreBtn = fixture.debugElement.query(By.css('.more'));
      expect(loadMoreBtn).toBeFalsy();
    });
    done();
  });
});
