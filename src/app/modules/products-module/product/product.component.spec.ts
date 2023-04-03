import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { Product } from '../models/product.data';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the product url to imageErrors when handleImageError is called', () => {
    const product: Product = {
      title: 'Test Product',
      description: 'Test Description',
      image: 'https://example.com/image.jpg',
      url: 'https://example.com/product',
      categories: ['Category 1', 'Category 2'],
    };

    component.handleImageError(product);
    expect(component.imageErrors.has(product.url)).toBeTrue();
  });
});
