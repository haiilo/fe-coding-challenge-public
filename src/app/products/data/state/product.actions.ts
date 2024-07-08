import { createAction, props } from "@ngrx/store";
import { Product } from "../../../shared/models/product";
import { Page } from "../../../shared/models/page";

export const getProducts = createAction(
  '[Product Components] Get Products',
  props<{ page: number }>()
);

export const getProductsSuccess = createAction(
  '[Product API] Get Products Success',
  props<{ products: Page<Product> }>()
);

export const getProductsFailed = createAction(
  '[Product API] Get Products Failed',
  props<{ error: Error }>()
);
