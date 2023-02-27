import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent, TagComponent } from '../shared/components';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,

    // Shared components
    AlertComponent,
    TagComponent,
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
