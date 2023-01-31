import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductListComponent } from './productList.component';
import { ProductCardComponent } from '../productCard/productCard.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('ProductListComponent', () => {
  let fixture: ComponentFixture<ProductListComponent>;
  let component: ProductListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent, ProductCardComponent],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ProductListComponent);
      component = fixture.componentInstance;
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not have a Load More button while loading is in progress', () => {
    fixture.detectChanges();
    const loadMoreButton = fixture.debugElement.nativeElement.querySelector('button');
    expect(loadMoreButton).toBeNull();
  });

  it('should have a Load More button when loading is not in progress', () => {
    spyOn(component.productService, 'get').and.returnValue(of({ content: [], more: true }));
    fixture.detectChanges();
    const loadMoreButton = fixture.debugElement.nativeElement.querySelector('button');
    expect(loadMoreButton).toBeTruthy();
  });

  it('should show images for each loaded product', () => {
    spyOn(component.productService, 'get').and.returnValue(of({ content: [
        {
          url: 'MOCK_URL',
          title: 'MOCK_TITLE',
          description: 'MOCK_DESCRIPTION',
          image: 'MOCK_URL',
          categories: [],
        },
        {
          url: 'MOCK_URL',
          title: 'MOCK_TITLE',
          description: 'MOCK_DESCRIPTION',
          image: 'MOCK_URL',
          categories: [],
        }
      ], more: true }));
    fixture.detectChanges();
    const images = fixture.debugElement.queryAll(By.css('.product-card'));
    expect(images).toHaveSize(2);
  });
});
