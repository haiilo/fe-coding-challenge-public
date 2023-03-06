import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from './products/page';
import { Product } from './products/product';
import { ProductService } from './products/product.service';

export const FETCH_FAILED_ERROR = 'FETCH_FAILED_ERROR';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentPage = -1;

  hasMore = true;

  isFetchingData = false;

  fetchFailed = false;

  constructor(private readonly productService: ProductService) {}

  ngOnInit() {
    this.loadData();
  }

  products: Array<Product> = [];

  onLoadMoreClick() {
    this.loadData();
  }

  private loadData(retriesLeft = 3) {
    // I would implement a retrying at the service level but the instructions said
    // that shouldn't be changed, so it will just have to be improvised here
    this.isFetchingData = true;
    this.fetchFailed = false;

    if (!retriesLeft) {
      this.fetchFailed = true;
      this.isFetchingData = false;
      return;
    }

    this.productService.get(this.currentPage + 1).subscribe({
      next: (data) => {
        this.hasMore = data.more;
        this.currentPage++;
        this.products = [...this.products, ...data.content];
      },
      error: (err) => {
        // would normally check error type
        this.loadData(retriesLeft - 1);
      },
      complete: () => {
        this.isFetchingData = false;
        this.fetchFailed = false;
      },
    });
  }
}
