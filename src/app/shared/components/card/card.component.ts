import { Component, Input } from '@angular/core';
import { Product } from '../../../products/core/models/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() product: Product | undefined;

  openProductUrl(): void {
    if (!this.product) {
      return;
    }
    window.open(this.product.url, '_blank');
  }
}
