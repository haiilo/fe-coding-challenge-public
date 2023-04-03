import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsContentComponent } from './products-content/products-content.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    component: ProductsContentComponent,
    path: '',
  },
  {
    component: ProductDetailsComponent,
    path: 'product-details/:title',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsModuleRoutingModule {}
