import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product: Product | undefined;

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.productService.selectedProduct$.subscribe((product) => {
      this.product = product;
    });
  }

  goBackToProducts(): void {
    this.router.navigate(['/']);
  }
}
