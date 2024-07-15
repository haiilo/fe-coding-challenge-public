import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
    let component: ProductCardComponent;
    let fixture: ComponentFixture<ProductCardComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ProductCardComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the placeholder image when loading', () => {
        component.loading = true;
        fixture.detectChanges();

        const placeholderImage = fixture.debugElement.query(By.css('.card-image-container img'));

        expect(placeholderImage.nativeElement.src).toContain(component.imagePlaceholder);
    });

    it('should display the product image when not loading', () => {
        const PRODUCT_IMAGE = 'product-image.png';
        component.product = {
            url: '',
            image: PRODUCT_IMAGE,
            title: '',
            description: '',
            categories: [],
        };
        component.loading = false;
        fixture.detectChanges();
        const productImage = fixture.debugElement.query(By.css('.card-image-container img'));
        expect(productImage.attributes['data-src']).toBe(PRODUCT_IMAGE);
    });

    it('should display skeletons when loading', () => {
        component.loading = true;
        fixture.detectChanges();
        const skeletons = fixture.debugElement.queryAll(By.css('.skeleton'));

        expect(skeletons.length).toBeGreaterThan(0);
    });

    it('should display product details when not loading', () => {
        component.product = {
            url: 'test.test',
            image: 'product-image.jpg',
            title: 'Product Title',
            description: 'Product Description',
            categories: ['Category1'],
        };
        component.loading = false;
        fixture.detectChanges();
        const title = fixture.debugElement.query(By.css('.card-content-title')).nativeElement.textContent.trim();
        const description = fixture.debugElement.query(By.css('.card-content-description')).nativeElement.textContent.trim();
        const categories = fixture.debugElement.queryAll(By.css('.product-category'));

        expect(title).toBe('Product Title');
        expect(description).toBe('Product Description');
        expect(categories.length).toBe(1);
        expect(categories[0].nativeElement.textContent.trim()).toBe('Category1');
    });

    it('should call goToCardUrl on click', () => {
        spyOn(component, 'goToCardUrl');
        const cardWrapper = fixture.debugElement.query(By.css('.card-wrapper'));
        cardWrapper.triggerEventHandler('click', null);
        expect(component.goToCardUrl).toHaveBeenCalled();
    });
});
