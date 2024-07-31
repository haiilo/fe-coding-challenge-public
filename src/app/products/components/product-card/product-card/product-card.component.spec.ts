import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductCardComponent } from './product-card.component';
import { Product } from 'src/app/products/product';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  const mockProduct: Product = {
    url: 'http://example.com',
    title: 'Test Product',
    description: 'This is a test product description. It is supposed to be quite long to test text overflow.',
    image: 'http://example.com/image.jpg',
    categories: ['Category1', 'Category2', 'Category3']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    component.product = mockProduct;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the product title', () => {
    const titleElement: HTMLElement = fixture.debugElement.query(By.css('.card-title')).nativeElement;
    expect(titleElement.textContent).toContain(mockProduct.title);
  });

  it('should display the product description', () => {
    const descriptionElement: HTMLElement = fixture.debugElement.query(By.css('.card-description')).nativeElement;
    expect(descriptionElement.textContent).toContain(mockProduct.description);
  });

  it('should display the product categories', () => {
    const categoryElements = fixture.debugElement.queryAll(By.css('.card-categories li'));
    expect(categoryElements.length).toBe(mockProduct.categories.length);
    mockProduct.categories.forEach((category, index) => {
      expect(categoryElements[index].nativeElement.textContent).toContain(category);
    });
  });

  it('should display an image if provided', () => {
    const imageElement = fixture.debugElement.query(By.css('.card-image'));
    expect(imageElement.nativeElement.style.backgroundImage).toContain(mockProduct.image ?? 'none');
  });

  it('should show "Image not available" if no image is provided', () => {
    component.product.image = null;
    fixture.detectChanges();

    const placeholderElement: HTMLElement = fixture.debugElement.query(By.css('.card-image .placeholder')).nativeElement;
    expect(placeholderElement).toBeTruthy();
    expect(placeholderElement.textContent).toContain('Image not available');
  });

  it('should open the product URL in a new tab when the card is clicked', () => {
    spyOn(window, 'open');

    const cardElement = fixture.debugElement.query(By.css('.card')).nativeElement;
    cardElement.click();

    expect(window.open).toHaveBeenCalledWith(mockProduct.url, '_blank');
  });
});
