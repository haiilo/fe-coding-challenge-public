import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { Product } from 'src/app/products';
import { By } from '@angular/platform-browser';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = {} as Product;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default image on error', fakeAsync(() => {

    const imgDebugElement = fixture.debugElement.query(By.css('img'));
    const imgElement: HTMLImageElement = imgDebugElement.nativeElement;

    imgDebugElement.triggerEventHandler('error', null);
    fixture.detectChanges();

    expect(imgElement.src).toContain('assets/images/placeholder-2-1.png');
  }));
});
