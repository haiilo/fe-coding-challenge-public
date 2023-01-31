import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductCardComponent } from './productCard.component';

describe('ProductCardComponent', () => {
  let fixture: ComponentFixture<ProductCardComponent>;
  let component: ProductCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ProductCardComponent);
      component = fixture.componentInstance;
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open the product url when clicked', () => {
    spyOn(window, 'open');
    component.product =  {
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
