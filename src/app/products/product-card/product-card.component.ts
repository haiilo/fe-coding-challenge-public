import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, filter, map, of, Subject, takeUntil } from 'rxjs';

import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$: Subject<void> = new Subject<void>();

  public isLoading = false;
  public products: Product[] | undefined = [];
  public errorMessage: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.productService.get(0)
      .pipe(
        filter(products => !!products),
        map(products => products.content),
        takeUntil(this.ngUnsubscribe$),
        catchError(() => {
          this.isLoading = false;
          this.errorMessage = 'Error loading products. Please try again later.';
          return of([]);
        }))
      .subscribe((products: Product[]) => {
        this.isLoading = false
        this.products?.push(...products)
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
