import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { productReducer } from "../data/state/product.reducer";
import { ProductUi } from "../ui/product-ui/product-ui.component";
import * as productEffects from '../data/state/product.effects';
import { ProductComponent } from "./product.component";
import { CommonModule } from "@angular/common";
import { PRODUCTS_FEATURE_KEY } from "../data/state/product.state";
import { ProductRoutingModule } from "./product-routing.module";

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    StoreModule.forFeature(PRODUCTS_FEATURE_KEY, productReducer),
    EffectsModule.forFeature(productEffects)
  ],
  declarations: [ProductComponent, ProductUi],
})
export class ProductModule {}
