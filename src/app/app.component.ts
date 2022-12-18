import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from './products/page';
import { Product } from './products/product';
import { ProductService } from './products/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  noImageUrl = 'https://via.placeholder.com/400/888888/FFFFFF/?text=NoImage';

  constructor(
    private readonly productService: ProductService,
    private readonly toastr: ToastrService
  ) {
  }

  readonly products$: Observable<Page<Product>> = this.productService.get(0);

  openLink(url: string) {
    window.open(url, "_blank");
  }

  openCategory(category: string) {
    this.toastr.success(`Category '${category} selected.`, 'Category');
  }
}
