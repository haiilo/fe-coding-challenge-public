import { Component, Input } from '@angular/core';
import { Product } from '../products/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product!: Product;

  public categories: any = [];
  public category: string | undefined;

  ngOnInit() {
    this.categories = this.product.categories;
  }

  public handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/placeholder.webp';
  }

  public goToUrl(url: string): void {
    window.open(url, "_blank");
  }
}
