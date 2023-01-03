import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsStore } from './products.store';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsStore]
})
export class ProductsComponent {

  readonly products$: Observable<Product[]> = this.productsStore.products$;
  readonly loading$: Observable<boolean> = this.productsStore.loading$;
  readonly couldLoadMore$: Observable<boolean> = this.productsStore.couldLoadMore$;

  constructor(
    private readonly productsStore: ProductsStore
  ) {
  }

  loadMore() {
    this.productsStore.loadMore();
  }
}
