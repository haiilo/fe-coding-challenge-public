import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  
  @Input() product!: Product;
  imageUrl!: string;

  ngOnInit(): void {
    this.imageUrl = this.product.image ? this.product.image : 'assets/product-placeholder.jpg';    
  }

  openProductUrl(url: string): void {
    window.open(url, '_blank');
  }
  
}
