import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/products/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  noImageUrl = 'https://via.placeholder.com/400/888888/FFFFFF/?text=NoImage';

  @Input() product!: Product;

  constructor(
    private readonly toastr: ToastrService
  ) {
  }

  openCategory(category: string) {
    this.toastr.success(`Category '${category}' selected.`, 'Category');
  }
}
