import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsComponent } from './products.component';
import { TruncateDescriptionDirective } from './directives/truncate-description.directive';
import { ProductsRoutingModule } from './products-routing.module';


@NgModule({
  declarations: [
    ProductCardComponent,
    ProductsComponent,
    TruncateDescriptionDirective,
  ],
  imports: [
    CommonModule, 
    ProductsRoutingModule
  ],
  exports: [
    ProductsComponent, 
    TruncateDescriptionDirective
  ],
})
export class ProductsModule {}
