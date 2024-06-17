import {ComponentFixture, TestBed} from '@angular/core/testing';
import {delay, of} from "rxjs";
import {ProductService} from "src/app/products/services/product.service";

import {ProductsGridComponent} from './products-grid.component';

describe('ProductsGridComponent', () => {
  let component: ProductsGridComponent;
  let fixture: ComponentFixture<ProductsGridComponent>;
  let mockProductService: any;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['get']);
    mockProductService.get.and.callFake((page: number) => {
      const products = { more: page < 3, content: [{ id: page, title: 'Product ' + page }] };
      return of(products).pipe(delay(100));
    });

    await TestBed.configureTestingModule({
      declarations: [ ProductsGridComponent ],
      providers: [
        { provide: ProductService, useValue: mockProductService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty product list and load products on demand', () => {
    const testProducts = [{ id: 1, title: 'Test Product', image: '', url: '', description: '', categories: [] }];
    mockProductService.get.and.returnValue(of({ more: true, content: testProducts }));

    component.loadMore();
    fixture.detectChanges();

    component.products$.subscribe(products => {
      expect(products.length).toBe(1);
      expect(products[0].title).toEqual('Test Product');
    });
  });

});
