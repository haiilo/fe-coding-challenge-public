import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ProductService } from '../services/product.service';
import { ProductsContentComponent } from './products-content.component';
import { Product } from '../models/product.data';

describe('ProductsContentComponent', () => {
  let component: ProductsContentComponent;
  let fixture: ComponentFixture<ProductsContentComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsContentComponent],
      imports: [RouterTestingModule],
      providers: [ProductService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsContentComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on initialization', () => {
    spyOn(productService, 'get').and.returnValue(
      of({ content: [], more: false })
    );
    component.ngOnInit();
    expect(productService.get).toHaveBeenCalled();
  });

  // it('should call selectProduct and navigate to product-details on openProduct', () => {
  //   const router = TestBed.inject(Router);
  //   spyOn(router, 'navigate');
  //   spyOn(productService, 'selectProduct');

  //   const product: Product = {
  //     title: 'Test Product',
  //     description: 'Test Description',
  //     image: 'https://test.com/image.jpg',
  //     url: 'https://test.com/product',
  //     categories: ['Category 1', 'Category 2'],
  //   };

  //   component.openProduct(product);
  //   expect(productService.selectProduct).toHaveBeenCalledWith(product);
  //   expect(router.navigate).toHaveBeenCalledWith([
  //     'product-details/',
  //     product.title,
  //   ]);
  // });

  it('should call productService.get when loadNextProducts is called and hasMorePages is true, loading$ is false, and error is false', (done) => {
    spyOn(productService, 'get').and.callThrough();

    component.hasMorePages = true;
    component.loading$.next(false);
    component.error = false;

    component.loadNextProducts();

    // Wait for the next change in the loading$ BehaviorSubject
    component.loading$.subscribe((isLoading) => {
      if (!isLoading) {
        expect(productService.get).toHaveBeenCalled();
        done();
      }
    });
  });

  it('should set error to true when loading products fails', () => {
    spyOn(productService, 'get').and.returnValue(
      throwError(() => new Error('Error loading products'))
    );
    component.loadProducts();
    expect(component.error).toBeTrue();
  });
});
