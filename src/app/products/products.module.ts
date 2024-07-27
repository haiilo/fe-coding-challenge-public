import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { PageLoaderComponent, ProductComponent } from './components';

@NgModule({
  declarations: [ProductsComponent, PageLoaderComponent, ProductComponent],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
