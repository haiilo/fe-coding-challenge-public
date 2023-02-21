import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    productService = jasmine.createSpyObj('ProductService', ['get']);

    TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
      providers: [{ provide: ProductService, useValue: productService }]
    });
    component = new ProductCardComponent(productService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const mockProducts: Product[] =  [
    { url:'product1', image: 'product.jpeg', title: 'Product 1', description: 'Description for product 1', categories: ['Category A', 'Category B'] },
    { url:'product2', image: 'product.jpeg', title: 'Product 2', description: 'Description for product 2', categories: ['Category C', 'Category D'] }
  ];

  it('should set isLoading to false when getProducts is called', () => {
    productService.get.and.returnValue(of({ content: mockProducts, more: true }));
    component.getProducts();
    expect(component.isLoading).toBe(false);
  });

  it('should set isLoading to false and add products to the list when products are retrieved successfully', () => {
    productService.get.and.returnValue(of({ content: mockProducts, more: true }));
    component.getProducts();
    expect(component.isLoading).toBe(false);
    expect(component.products).toEqual(mockProducts);
  });

  it('should set isLoading to false and display an error message when there is an error retrieving products', () => {
    productService.get.and.returnValue(throwError('Error'));
    component.getProducts();
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBe('Error loading products. Please try again later.');
  });

  it('should call getProducts when ngOnInit is called', () => {
    spyOn(component, 'getProducts');
    productService.get.and.returnValue(of({ content: mockProducts, more: true }));
    component.ngOnInit();
    expect(component.getProducts).toHaveBeenCalled();
  });


  afterEach(() => {
    component.ngOnDestroy();
  });
});
