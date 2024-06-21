import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from './core/services/product.service';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Page } from './core/models/page';
import { Product } from './core/models/product';
import { ToastService } from '../shared/core/services/toast.service';
import { ToastType } from '../shared/core/enums/toast-type.enum';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  isLoading = true;
  counter = 0;
  products: Product[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly productService: ProductService,
    private toastService: ToastService
  ) {
  }

  productsSubject: Subject<Page<Product>> = new Subject();
  readonly products$: Observable<Page<Product>> = this.productsSubject.asObservable();

  ngOnInit(): void {
    this.loadMore();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMore() {
    this.isLoading = true;
    this.counter++;
    this.productService.get(this.counter).pipe(
      tap(page => {
        this.products = [...this.products, ...page.content];
        this.productsSubject.next({ more: page.more, content: this.products });
        if (page.content.length === 0) {
          this.toastService.showMessage('No more products to load.', 3000, ToastType.INFO);
        } else {
          this.toastService.showMessage('Products loaded successfully.', 3000, ToastType.SUCCESS);
        }
        this.isLoading = false;
      }),
      catchError(error => {
        this.isLoading = false;
        this.toastService.showMessage('An error occurred while loading products.', 3000, ToastType.ERROR);
        return throwError(() => error);
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
