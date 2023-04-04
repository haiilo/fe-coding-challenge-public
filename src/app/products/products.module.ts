import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductService } from './services/product.service';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule {
}
