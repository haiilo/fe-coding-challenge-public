import { CommonModule } from '@angular/common';
import {
  Component,
  HostBinding,
  Input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Product } from 'src/app/products';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProductCardComponent {
  @HostBinding('class') class = 'card';

  @Input() product!: Product;

  imageSrc = signal<string | null | undefined>('');

  ngOnInit(): void {
    this.imageSrc.set(this.product.image);
  }

  setDefaultPic(): void {
    this.imageSrc.set('assets/images/placeholder-2-1.png');
  }
}
