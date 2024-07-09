import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { finalize } from 'rxjs';
import { Page } from './interfaces/page';
import { Product } from './interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  private currentPage = 0;
  loading = false;
  error: string | null = null;
  moreProducts = true;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.error = null;
    this.productService
      .get(this.currentPage)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (page: Page<Product>) => {
          this.products = [...this.products, ...page.content];
          this.moreProducts = page.more;
        },
        error: (error) => {
          this.handleError();
        },
      });
  }

  handleError() {
    this.error =
      'An error occurred while loading products. Please try again later.';
  }

  onReadMore() {
    this.currentPage++;
    this.loadProducts();
  }
}
