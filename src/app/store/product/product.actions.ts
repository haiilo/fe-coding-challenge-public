import { createAction, props } from '@ngrx/store';
import { Page, Product } from 'src/app/products';

export enum ProductActionTypes {
  LOAD_PRODUCTS = '[Product] Load Products',
  LOAD_PRODUCTS_SUCCESS = '[Product] Load Products Success',
  SET_IS_LOADING = '[Product] Set Is Loading',
  SET_PAGE = '[Product] Set Page',
  RESET_PRODUCTS_PAGE = '[Product] Reset Products Page',
  LOAD_MORE_PRODUCTS = '[Product] Load More Products',
  LOAD_MORE_PRODUCTS_SUCCESS = '[Product] Load More Products Success',
  SET_PRODUCTS_ERROR = '[Product] Set Products Error',
  SET_HAS_ERROR = '[Product] Set Has Error',
}

export const loadProducts = createAction(
  ProductActionTypes.LOAD_PRODUCTS,
  props<{ page: number }>()
);

export const loadProductsSuccess = createAction(
  ProductActionTypes.LOAD_PRODUCTS_SUCCESS,
  props<{ productsPage: Page<Product> }>()
);

export const setIsLoading = createAction(
  ProductActionTypes.SET_IS_LOADING,
  props<{
    isLoading: boolean;
  }>()
);

export const setPage = createAction(
  ProductActionTypes.SET_PAGE,
  props<{
    page: number;
  }>()
);

export const resetProductsPage = createAction(
  ProductActionTypes.RESET_PRODUCTS_PAGE
);

export const loadMoreProducts = createAction(
  ProductActionTypes.LOAD_MORE_PRODUCTS
);

export const loadMoreProductsSuccess = createAction(
  ProductActionTypes.LOAD_MORE_PRODUCTS_SUCCESS,
  props<{ productsPage: Page<Product> }>()
);

export const setProductsError = createAction(
  ProductActionTypes.SET_PRODUCTS_ERROR,
  props<{ err: string }>()
);

export const setHasError = createAction(
  ProductActionTypes.SET_HAS_ERROR,
  props<{ value: boolean }>()
);
