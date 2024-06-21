import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductService } from './product.service';
import { Page } from '../models/page';
import { Product } from '../models/product';

describe('ProductService', () => {
  let service: ProductService;

  const mockProducts: Product[] = [
    {
      url: 'testUrl1',
      title: 'testTitle1',
      description: 'testDescription1',
      image: 'testImage1',
      categories: ['testCategory1']
    },
    {
      url: 'testUrl2',
      title: 'testTitle2',
      description: 'testDescription2',
      image: 'testImage2',
      categories: ['testCategory2']
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Page<ProductModel>>', () => {
    const mockPage: Page<Product> = {
      more: true,
      content: [
        {
          url: 'testUrl',
          title: 'testTitle',
          description: 'testDescription',
          image: 'testImage',
          categories: ['testCategory']
        }
      ]
    };

    spyOn(service, 'get').and.returnValue(of(mockPage));

    service.get(1).subscribe(page => {
      expect(page).toEqual(mockPage);
    });
  });

  it('should return an empty page when page number is greater than PAGE_COUNT', () => {
    const mockPage: Page<Product> = {
      more: false,
      content: []
    };

    spyOn(service, 'get').and.returnValue(of(mockPage));

    service.get(5).subscribe(page => {
      expect(page).toEqual(mockPage);
    });
  });

  it('should return a page with content when page number is equal to PAGE_COUNT', () => {
    const mockPage: Page<Product> = {
      more: false,
      content: [
        {
          url: 'testUrl',
          title: 'testTitle',
          description: 'testDescription',
          image: 'testImage',
          categories: ['testCategory']
        }
      ]
    };

    spyOn(service, 'get').and.returnValue(of(mockPage));

    service.get(4).subscribe(page => {
      expect(page).toEqual(mockPage);
    });
  });

  it('should return a page with more content when page number is less than PAGE_COUNT', () => {
    const mockPage: Page<Product> = {
      more: true,
      content: [
        {
          url: 'testUrl',
          title: 'testTitle',
          description: 'testDescription',
          image: 'testImage',
          categories: ['testCategory']
        }
      ]
    };

    spyOn(service, 'get').and.returnValue(of(mockPage));

    service.get(3).subscribe(page => {
      expect(page).toEqual(mockPage);
    });
  });

  it('should throw an error when page number is less than 0', () => {
    const errorResponse = new Error('400 Bad Request');

    spyOn(service, 'get').and.returnValue(throwError(errorResponse));

    service.get(-1).subscribe({
      next: () => fail('should have failed with 400 Bad Request'),
      error: (error: Error) => {
        expect(error).toEqual(errorResponse);
      }
    });
  });

  it('should return an empty page when page number is greater than PAGE_COUNT', () => {
    const expectedPage: Page<Product> = {
      more: false,
      content: []
    };

    service.get(ProductService.getPageCount() + 1).subscribe(page => {
      expect(page).toEqual(expectedPage);
    });
  });

  it('should return a page with content when page number is equal to PAGE_COUNT', () => {
    const expectedPage: Page<Product> = {
      more: false,
      content: mockProducts
    };

    service.get(ProductService.getPageCount()).subscribe(page => {
      expect(page).toEqual(expectedPage);
    });
  });

  it('should throw a 400 Bad Request error when page number is less than 0', (done) => {
    const expectedError = new Error('400 Bad Request');

    service.get(-1).subscribe({
      next: () => fail('should have failed with 400 Bad Request'),
      error: (error: Error) => {
        expect(error.message).toEqual(expectedError.message);
        done();
      }
    });
  });
});
