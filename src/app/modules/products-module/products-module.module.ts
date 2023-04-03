import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModuleRoutingModule } from './products-module-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductsContentComponent } from './products-content/products-content.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UrlOpenerService } from './services/url-opener.service';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    ProductsContentComponent,
    ProductComponent,
    ProductDetailsComponent,
  ],
  imports: [CommonModule, ProductsModuleRoutingModule],
  providers: [UrlOpenerService, ProductService]
})
export class ProductsModuleModule {}
