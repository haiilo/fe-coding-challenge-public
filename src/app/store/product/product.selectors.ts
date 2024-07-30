import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as ProductReducer from './product.reducer';
import { Page, Product } from 'src/app/products';

const selectProductState = createFeatureSelector<ProductReducer.ProductState>(
  ProductReducer.FEATURE_KEY
);

export const selectProductsPage = createSelector(
  selectProductState,
  (state): Page<Product> | undefined => state.productsPage
);

export const selectPage = createSelector(
  selectProductState,
  (state): number => state.page
);

export const selectIsLoading = createSelector(
  selectProductState,
  (state): boolean => state.isLoading
);

export const selectHasError = createSelector(
  selectProductState,
  (state): boolean => state.hasError
);
