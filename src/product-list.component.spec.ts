import { TestBed } from '@angular/core/testing';

import {of} from "rxjs";
import {By} from "@angular/platform-browser";

import {ProductListComponent} from "./product-list.component";
import {ProductCardComponent} from "../product-card/product-card.component";

describe('ProductListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent, ProductCardComponent]
    }).compileComponents();
  });

  it('should create the product list component', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const productListComponent = fixture.componentInstance;
    expect(productListComponent).toBeTruthy();
  });

  it('should not have a Load More button while loading is in progress', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    fixture.detectChanges();
    const loadMoreButton = fixture.debugElement.nativeElement.querySelector('button');
    expect(loadMoreButton).toBeNull();
  });

  it('should show images for each loaded product', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const productListComponent = fixture.componentInstance;
    spyOn(productListComponent.productService, 'get').and.returnValue(of({ content: [
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
  it('should have a loading button after product loading', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const productListComponent = fixture.componentInstance;
    spyOn(productListComponent.productService, 'get').and.returnValue(of({ content: [
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
    const loadMoreButton = fixture.debugElement.nativeElement.querySelector('button');
    expect(loadMoreButton).not.toBeNull();
  });

  it('should call getProduct function on loading button clicked button', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const productListComponent = fixture.componentInstance;
    spyOn(productListComponent.productService, 'get').and.returnValue(of({ content: [
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

    const loadMoreButton = fixture.debugElement.nativeElement.querySelector('button');
    spyOn(productListComponent, 'getPage');
    loadMoreButton.click()
    expect(productListComponent.getPage).toHaveBeenCalled()
  });
});
