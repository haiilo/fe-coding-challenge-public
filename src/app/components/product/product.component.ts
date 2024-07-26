import { Component, Input } from '@angular/core';
import { Product } from 'src/app/products/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() data?: Product;
}
