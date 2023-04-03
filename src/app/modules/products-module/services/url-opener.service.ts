import { Injectable } from '@angular/core';
import { Product } from '../models/product.data';

@Injectable({
  providedIn: 'root',
})
export class UrlOpenerService {
  constructor() {}

  openUrlInNewTab(product: Product): void {
    if (product.url) {
      window.open(product.url, '_blank');
    }
  }
}
