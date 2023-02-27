import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../interfaces';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input() product: Product | null = null;

}
