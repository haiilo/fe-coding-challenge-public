import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PRODUCTS_FEATURE_KEY, ProductState } from "./product.state";

export const selectProductState = createFeatureSelector<ProductState>(PRODUCTS_FEATURE_KEY);

export const selectProducts = createSelector(selectProductState, (state: ProductState) => state.products);

export const selectProductsLoading = createSelector(selectProductState, (state: ProductState) => state.loading);

export const selectProductsLoaded = createSelector(selectProductState, (state: ProductState) => state.loaded);

export const selectHasMoreProducts = createSelector(selectProductState, (state: ProductState) => state.products.more);
