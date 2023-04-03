import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, finalize, tap } from 'rxjs';
import { Product } from 'src/app/modules/products-module/models/product.data';
import { ProductService } from 'src/app/modules/products-module/services/product.service';

@Component({
  selector: 'app-products-content',
  templateUrl: './products-content.component.html',
  styleUrls: ['./products-content.component.scss'],
})
export class ProductsContentComponent implements OnInit {
  loading$ = new BehaviorSubject<boolean>(false);
  products: Product[] = [];
  hasMorePages = true;
  error = false;
  page = 0;

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading$.next(true);
    this.error = false;
    this.productService
      .get(this.page)
      .pipe(
        tap((page) => {
          this.products = this.products.concat(page.content);
          this.hasMorePages = page.more;
          this.page++;
        }),
        catchError(() => {
          this.error = true;
          return [];
        }),
        finalize(() => {
          this.loading$.next(false);
        })
      )
      .subscribe();
  }

  loadNextProducts(): void {
    if (this.hasMorePages && !this.loading$.value && !this.error) {
      this.loading$.next(true);
      this.productService
        .get(this.page)
        .pipe(
          tap((page) => {
            this.products = this.products.concat(page.content);
            this.hasMorePages = page.more;
            this.page++;
          }),
          catchError(() => {
            this.error = true;
            return [];
          }),
          finalize(() => {
            this.loading$.next(false);
          })
        )
        .subscribe();
    }
  }

  openProduct(product: Product): void {
    //Product-details
    // this.productService.selectProduct(product);
    // this.router.navigate(['product-details/', product.title]);

    if (product.url) {
      window.open(product.url, '_blank');
    }
  }
}
