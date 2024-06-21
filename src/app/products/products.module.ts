import { NgModule } from '@angular/core';
import { CardComponent } from '../shared/components/card/card.component';
import { ProductsComponent } from './products.component';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';

@NgModule({
  declarations: [CardComponent, ProductsComponent],
  imports: [
    AsyncPipe,
    JsonPipe,
    NgIf,
    NgForOf
  ],
  providers: [],
  exports: [
    ProductsComponent
  ],
  bootstrap: []
})
export class ProductsModule {
}
