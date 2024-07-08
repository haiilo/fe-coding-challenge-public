import { createReducer, on } from "@ngrx/store";
import { initialProductState } from "./product.state";
import { ProductActions } from "./action-types";

export const productReducer = createReducer(
  initialProductState,
  on(ProductActions.getProducts, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(ProductActions.getProductsSuccess, (state, { products }) => ({
    ...state,
    products: { content: [...state.products.content, ...products.content], more: products.more },
    loading: false,
    loaded: true,
    error: null
  })),
  on(ProductActions.getProductsFailed, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error
  })),
);
