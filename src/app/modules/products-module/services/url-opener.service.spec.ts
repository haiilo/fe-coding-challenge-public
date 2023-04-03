import { TestBed } from '@angular/core/testing';

import { UrlOpenerService } from './url-opener.service';
import { Product } from '../models/product.data';

describe('UrlOpenerService', () => {
  let service: UrlOpenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlOpenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a new tab with the provided URL', () => {
    const product: Product = {
      url: 'https://example.com/product',
      title: 'Test Product',
      description: 'Test Description',
      image: 'https://example.com/image.jpg',
      categories: ['Category 1', 'Category 2'],
    };

    spyOn(window, 'open');

    service.openUrlInNewTab(product);

    expect(window.open).toHaveBeenCalledWith(product.url, '_blank');
  });

  it('should not open a new tab if the URL is not provided', () => {
    const product: Product = {
      url: '',
      title: 'Test Product',
      description: 'Test Description',
      image: 'https://example.com/image.jpg',
      categories: ['Category 1', 'Category 2'],
    };

    spyOn(window, 'open');

    service.openUrlInNewTab(product);

    expect(window.open).not.toHaveBeenCalled();
  });
});
