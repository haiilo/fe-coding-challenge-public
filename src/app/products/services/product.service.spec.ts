import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Page, Product } from '../interfaces';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get()', () => {
    it('should return {false, []} if page > 4', (done: any) => {
      ProductService['PAGE_ERROR'] = 0;

      service.get(5).subscribe((result: Page<Product>) => {
        expect(result.more).toBe(false);
        expect(result.content.length).toBe(0);
        done();
      });
    });

    it('should return {false, content} if page === 4', (done: any) => {
      ProductService['PAGE_ERROR'] = 0;

      service.get(4).subscribe((result: Page<Product>) => {
        expect(result.more).toBe(false);
        expect(result.content.length).toBeGreaterThan(0);
        done();
      });
    });

    it('should return {true, content} if page >= 0', (done: any) => {
      ProductService['PAGE_ERROR'] = 0;

      service.get(1).subscribe((result: Page<Product>) => {
        expect(result.more).toBe(true);
        expect(result.content.length).toBeGreaterThan(0);
        done();
      });
    });

    it('should return 500 error if pageSize === 1', fakeAsync(() => {
      ProductService['PAGE_ERROR'] = 1;

      let currentVal: Page<Product> | undefined;
      let someError: Error | undefined;

      service
        .get(1)
        .subscribe({
          next: (result: Page<Product>) => {
            currentVal = result;
          },
          error: (error: Error) => {
            someError = error;
            expect(error.message).toBe('500 Internal Server Error');
          }
        });

      tick(1000);
      expect(currentVal).toBeUndefined();
      expect(someError).toBeDefined();
    }));

    it('should return 400 error if page < 0', fakeAsync(() => {
      ProductService['PAGE_ERROR'] = 0;

      let currentVal: Page<Product> | undefined;
      let someError: Error | undefined;

      service
        .get(-1)
        .subscribe({
          next: (result: Page<Product>) => {
            currentVal = result;
          },
          error: (error: Error) => {
            someError = error;
            expect(error.message).toBe('400 Bad Request');
          }
        });

      tick(1000);
      expect(currentVal).toBeUndefined();
      expect(someError).toBeDefined();
    }));
  });

  describe('getContent()', () => {
    it('should return correct array based on length param', () => {
      let test = service['getContent'](1);
      expect(test.length).toBe(1);
      test = service['getContent'](5);
      expect(test.length).toBe(5);
      test = service['getContent'](0);
      expect(test.length).toBe(0);
    });
  });
});
