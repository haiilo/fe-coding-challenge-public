import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input()
  public product?: Product;

  @HostListener('click')
  public handleProductClick() {
    window.open(this.product?.url, '_blank');
  }
}
