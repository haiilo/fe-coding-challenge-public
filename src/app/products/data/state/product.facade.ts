import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectHasMoreProducts, selectProducts } from "./product.selectors";
import { ProductActions } from "./action-types";

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  private store = inject(Store);

  products$ = this.store.select(selectProducts);

  more$ = this.store.select(selectHasMoreProducts);

  getAll(page: number): void {
    this.store.dispatch(ProductActions.getProducts({ page }));
  }
}
