import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create when no input product', () => {
    expect(component).toBeTruthy();
  });

  it('should create when regular input product', () => {
    component.product = {
      url: 'url',
      image: 'image url',
      title: 'lorem',
      description: 'lorem',
      categories: ['cat1', 'cat2'],
    };
    expect(component).toBeTruthy();
  });
});
