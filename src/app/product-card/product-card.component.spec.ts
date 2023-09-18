import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { productMock } from '../products/product-page-mock';
import { By } from '@angular/platform-browser';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProductCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = productMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open correct product link', () => {
    const link = fixture.debugElement.query(By.css('.product-link')).nativeElement;
    expect(link.href).toContain(productMock.url);
  });

  it('should display product image', () => {
    const image = fixture.debugElement.query(By.css('.product-image')).nativeElement;
    expect(image).toBeTruthy();
    expect(image.style.backgroundImage).toContain(productMock.image);
  });

  it('should display image placeholder', () => {
    component.product = {...productMock, image: null};
    fixture.detectChanges();

    const image = fixture.debugElement.query(By.css('.product-image'));
    expect(image).toBeFalsy();
    const imagePlaceholder = fixture.debugElement.query(By.css('.no-image'));
    expect(imagePlaceholder).toBeTruthy();
  });

  it('should display product title', () => {
    const title = fixture.debugElement.query(By.css('.product-title')).nativeElement;
    expect(title.textContent).toContain(productMock.title);
  });

  it('should display product description', () => {
    const description = fixture.debugElement.query(By.css('.product-description')).nativeElement;
    expect(description.textContent).toContain(productMock.description);
  });

  it('should display product categories', () => {
    const categories = fixture.debugElement.query(By.css('.product-categories')).nativeElement;
    productMock.categories.forEach((category) => {
      expect(categories.textContent).toContain(category);
    });
  });
});
