import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from './products/page';
import { Product } from './products/product';
import { ProductService } from './products/product.service';
import { ToastrService } from 'ngx-toastr';
import { ProductProvider } from './products/product.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  noImageUrl = 'https://via.placeholder.com/400/888888/FFFFFF/?text=NoImage';
  
  products$: Observable<Product[]> = this.productProvider.products$;
  hasMore$: Observable<boolean> = this.productProvider.hasMore$;

  constructor(
    private readonly productProvider: ProductProvider,
    private readonly toastr: ToastrService
  ) {
  }

  openLink(url: string) {
    window.open(url, "_blank");
  }

  openCategory(category: string) {
    this.toastr.success(`Category '${category} selected.`, 'Category');
  }

  loadMore() {
    this.productProvider.loadMore();
  }
}
