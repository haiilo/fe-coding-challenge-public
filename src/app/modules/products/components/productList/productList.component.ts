import { Component, OnInit } from '@angular/core';
import { Page } from '../../models/page';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { of, retry, concatMap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './productList.component.html',
  styleUrls: ['./productList.component.scss'],
})
export class ProductListComponent implements OnInit {
  public nextPageToLoad: number = 0;
  public products: Page<Product> = { content: [], more: true };
  public isLoading = false;
  public error?: string | null;

  constructor(public readonly productService: ProductService) { }

  getPage() {
    this.isLoading = true;
    this.error = null;
    of(this.nextPageToLoad).pipe(
      concatMap((page) => this.productService.get(page)),
      retry(3)
    ).subscribe({
      next: (data: Page<Product>) => {
        this.products = {
          content: [...this.products.content, ...data.content],
          more: data.more,
        }
        this.nextPageToLoad += 1;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error;
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    this.getPage();
  }
}
