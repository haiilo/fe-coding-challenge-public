import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/products/product';
import { ProductService } from 'src/app/products/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  readonly products$: Observable<Product[]> = this.productService.get(0).pipe(map(page => page.content));

  constructor(
    private readonly productService: ProductService
  ) {
  }
}
