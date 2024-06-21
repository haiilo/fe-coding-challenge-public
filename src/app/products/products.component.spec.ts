import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { Product } from './core/models/product';
import { Page } from './core/models/page';
import { of } from 'rxjs';
import { ProductService } from './core/services/product.service';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let service: ProductService;

  const mockProducts: Product[] = [
    {
      url: 'testUrl1',
      title: 'testTitle1',
      description: 'testDescription1',
      image: 'testImage1',
      categories: ['testCategory1']
    },
    {
      url: 'testUrl2',
      title: 'testTitle2',
      description: 'testDescription2',
      image: 'testImage2',
      categories: ['testCategory2']
    }
  ];

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      providers: [ProductService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should append page content to products and update productsSubject', (): void => {
    const mockPage: Page<Product> = {
      more: true,
      content: mockProducts
    };

    spyOn(service, 'get').and.returnValue(of(mockPage));

    const nextSpy = spyOn(component.productsSubject, 'next');

    component.loadMore();

    expect(component.products).toEqual(mockProducts);

    expect(nextSpy).toHaveBeenCalledWith({ more: mockPage.more, content: component.products });

    expect(component.isLoading).toBe(false);
  });
});
