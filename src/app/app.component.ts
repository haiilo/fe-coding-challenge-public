import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from './products/page';
import { Product } from './products/product';
import { ProductService } from './products/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly products$: Observable<Page<Product>> = this.productService.get(0);
  pageNo: number = 0;
  products: Product[] = [];
  hasMore: boolean = true;

  constructor(private readonly productService: ProductService) {
    this.loadProducts();
  }

  loadMore(){
    this.pageNo++;
    this.loadProducts();
  }

  loadProducts(){
    this.productService.get(this.pageNo).subscribe((response:Page<Product>)=>{
      this.products = [...this.products, ...response.content];
      this.hasMore = response.more;
    });
  }
}
