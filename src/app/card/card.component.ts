import { Component, Input } from '@angular/core';
import { Product } from '../products/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {
  @Input() item: Product;

  constructor() { }

  goToUrl() {
    window.open(this.item.url, "_blank");
  }
}
