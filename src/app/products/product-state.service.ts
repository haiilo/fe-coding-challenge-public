import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ProductService } from './product.service';
import { Product } from './product';
import { Page } from './page';

@Injectable({
  providedIn: 'root',
})
export class ProductStateService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private moreSubject = new BehaviorSubject<boolean>(true);
  private page = 0;

  products$ = this.productsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  more$ = this.moreSubject.asObservable();

  constructor(private productService: ProductService) {}

  loadMore() {
    if (this.loadingSubject.value) return;

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.productService
      .get(this.page)
      .pipe(
        tap((page: Page<Product>) => {
          if (page.content.length === 0) {
            this.moreSubject.next(false);
          } else {
            this.productsSubject.next([
              ...this.productsSubject.value,
              ...page.content,
            ]);
            this.moreSubject.next(page.more);
            this.page++;
          }
        }),
        catchError((error) => {
          this.errorSubject.next('Error loading products');
          return throwError(() => new Error(error));
        }),
        finalize(() => {
          this.loadingSubject.next(false);
        })
      )
      .subscribe();
  }
}
