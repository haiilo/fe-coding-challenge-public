import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared';


@NgModule({
  declarations: [
    ProductCardComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule, 
    SharedModule,
    ProductsRoutingModule
  ],
  exports: [
    ProductsComponent
  ],
})
export class ProductsModule {}
