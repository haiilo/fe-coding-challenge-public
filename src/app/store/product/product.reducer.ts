import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { Page, Product } from 'src/app/products';

export const FEATURE_KEY = 'PRODUCT';

export interface ProductState {
  productsPage?: Page<Product>;
  page: number;
  isLoading: boolean;
  hasError: boolean;
}

export const initialProductState: ProductState = {
  productsPage: undefined,
  page: 0,
  isLoading: true,
  hasError: false
};

export const productReducer = createReducer(
  initialProductState,
  on(ProductActions.setIsLoading, (state, payload) => {
    return {
      ...state,
      isLoading: payload.isLoading,
    };
  }),
  on(ProductActions.setPage, (state, payload) => {
    return {
      ...state,
      page: payload.page,
    };
  }),
  on(ProductActions.resetProductsPage, (state) => {
    return {
      ...state,
      page: 0,
      productsPage: undefined
    };
  }),
  on(ProductActions.loadProductsSuccess, (state, payload) => {
    return {
      ...state,
      productsPage: payload.productsPage,
    };
  }),
  on(ProductActions.loadMoreProductsSuccess, (state, payload) => {
    console.log("loadMoreProductsSuccess -> payload[" + payload.productsPage.content.length + "]: ", payload);
    return {
      ...state,
      productsPage: {
        ...payload.productsPage,
        content: [
          ...state.productsPage!.content,
          ...payload.productsPage?.content
        ],
      },
    };
  }),
  on(ProductActions.setHasError, (state, payload) => {
    return {
      ...state,
      hasError: payload.value,
    };
  }),
);
