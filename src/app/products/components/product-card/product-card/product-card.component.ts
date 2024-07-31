import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from 'src/app/products/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;

  getImageUrl(image: string | null | undefined): string {
    return image ? `url(${image})` : 'none';
  }

  openProductUrl(url: string): void {
    window.open(url, '_blank');
  }
}
