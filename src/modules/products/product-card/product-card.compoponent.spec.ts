import { TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent]
    }).compileComponents();
  });

  it('should create the product card component', () => {
    const fixture = TestBed.createComponent(ProductCardComponent);
    const productCard = fixture.componentInstance;
    expect(productCard).toBeTruthy();
  });

  it('should open the product url when clicked', () => {
    const fixture = TestBed.createComponent(ProductCardComponent);
    const productCard = fixture.componentInstance;
    spyOn(window, 'open');
    productCard.product =  {
      url: 'MOCK_URL',
      title: 'MOCK_TITLE',
      description: 'MOCK_DESCRIPTION',
      image: 'MOCK_URL',
      categories: [],
    };
    fixture.detectChanges();
    const card = fixture.debugElement.nativeElement.querySelector('.product-card');
    card.click();
    expect(window.open).toHaveBeenCalledWith('MOCK_URL', '_blank');
  });
});
