import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { Page } from '../page';
import { Product } from '../product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../product.service';
import { ProductsListComponent } from './products-list.component';

class MockProductService {
    get(page: number) {
        const products: Page<Product> = {
            more: page < 3,
            content: [
                {
                    url: 'url',
                    title: 'Product ' + page * 2,
                    description: 'Description',
                    image: null,
                    categories: ['Category'],
                },
                {
                    url: 'url',
                    title: 'Product ' + (page * 2 + 1),
                    description: 'Description',
                    image: null,
                    categories: ['Category'],
                },
            ],
        };
        return of(products);
    }
}

describe('ProductsListComponent', () => {
    let component: ProductsListComponent;
    let fixture: ComponentFixture<ProductsListComponent>;
    let productService: MockProductService;

    beforeEach(waitForAsync(() => {
        productService = new MockProductService();

        TestBed.configureTestingModule({
            declarations: [ProductsListComponent, ProductCardComponent],
            providers: [{ provide: ProductService, useValue: productService }],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // Class

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load products on initialization', waitForAsync(() => {
        component.products$.subscribe({
            next: (page) => {
                expect(page.content.length).toBe(2);
            },
        });
    }));

    it('should increment currentPage$ value after successful load', fakeAsync(() => {
        component.loadMore();
        component.loadMore();
        component.currentPage$.subscribe({
            next: (page) => {
                expect(page).toBe(3);
            },
        });
    }));

    it('should not increment current page when calling loadMore and it throws error', fakeAsync(() => {
        spyOn(productService, 'get').and.returnValue(throwError(() => new Error('Error occurred')));

        component.currentPage$.subscribe({
            next: (page) => {
                expect(page).toBe(1);
            },
        });

        component['_error$'].next('Error occurred');
        component.loadMore();
    }));

    it('should handle errors and set error state', fakeAsync(() => {
        spyOn(productService, 'get').and.returnValue(throwError(() => new Error('Error occurred')));

        component.loadMore();
        tick();

        component.error$.subscribe({
            next: (error) => expect(error).toBe('Error occurred'),
        });
    }));

    it('should load more products when loadMore is called', waitForAsync(() => {
        component.loadMore();
        component.products$.subscribe({
            next: (page) => {
                expect(page.content.length).toBeGreaterThan(1);
            },
        });
    }));

    it('should not load more products if already loading', waitForAsync(() => {
        component['_loading$'].next(true);
        component.loadMore();
        component.currentPage$.subscribe({
            next: (page) => {
                expect(page).toBe(1);
            },
        });
    }));

    it('should not load more products if no more available', waitForAsync(() => {
        component['_more$'].next(false);
        component.loadMore();
        component.currentPage$.subscribe({
            next: (page) => {
                expect(page).toBe(1);
            },
        });
    }));

    it('should add products to the list', waitForAsync(() => {
        component.products$.subscribe({
            next: (page) => {
                if (page.content.length === 2) {
                    expect(page.content[0].title).toBe('Product 2');
                    expect(page.content[1].title).toBe('Product 3');
                    component.loadMore();
                } else if (page.content.length === 4) {
                    expect(page.content[2].title).toBe('Product 4');
                    expect(page.content[3].title).toBe('Product 5');
                }
            },
        });
    }));

    // Template

    it('should display products when products are available', () => {
        const productElements = fixture.debugElement.queryAll(By.css('.product'));

        expect(productElements.length).toBe(2);
        expect(productElements[0].componentInstance.product.title).toBe('Product 2');
        expect(productElements[1].componentInstance.product.title).toBe('Product 3');
    });

    it('should display loading placeholders when loading', waitForAsync(() => {
        component['_loading$'].next(true);
        expect(component['_loading$'].value).toBeTrue();
        fixture.detectChanges();

        const productElements = fixture.debugElement.queryAll(By.css('.product'));
        expect(productElements.length).toBe(6);

        const loadingElements = fixture.debugElement.queryAll(By.css('.skeleton-title'));
        expect(loadingElements.length).toBe(4);
    }));

    it('should disable load more button when no more products', () => {
        component['_more$'].next(false);
        fixture.detectChanges();

        const buttonElement = fixture.debugElement.query(By.css('.more')).nativeElement;
        expect(buttonElement.disabled).toBeTrue();
    });

    it('should disable load more button when loading', () => {
        component['_loading$'].next(true);
        fixture.detectChanges();

        const buttonElement = fixture.debugElement.query(By.css('.more')).nativeElement;
        expect(buttonElement.disabled).toBeTrue();
    });

    it('should display error message when there is an error', () => {
        component['_error$'].next('Error occurred');
        fixture.detectChanges();

        const errorElement = fixture.debugElement.query(By.css('.products')).nativeElement;
        expect(errorElement.textContent).toContain('There was an error loading products. Please try to load more.');
    });
});
