import {Component, Input} from '@angular/core';
import {Product} from "../models/product";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor() {

  }

  openProductPage(): void {
    if (!this.product.url) {
      return;
    }

    window.open(this.product.url, '_blank');
  }
}
