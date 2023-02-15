import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ProductsRouting} from "./products.routing";

import {ProductCardComponent} from "./product-card/product-card.component";
import {ProductListComponent} from "./product-list/product-list.component";

@NgModule({
  declarations: [ProductCardComponent, ProductListComponent],
  imports: [CommonModule, ProductsRouting]
})

export class ProductsModule {}

