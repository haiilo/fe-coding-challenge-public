import { Component, HostListener, Input } from '@angular/core';
import {Product} from "../service/product";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})

export class ProductCardComponent {
  @Input()
  public product?: Product;

  @HostListener('click')
  public handleProductClick() {
    window.open(this.product?.url, '_blank');
  }
}
