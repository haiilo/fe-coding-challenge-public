import { Component, Input } from '@angular/core';
import { Product } from 'src/app/modules/products-module/models/product.data';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Product | undefined;
  imageErrors = new Set<string>();

  constructor() {}

  handleImageError(product: Product): void {
    this.imageErrors.add(product.url);
  }
}
