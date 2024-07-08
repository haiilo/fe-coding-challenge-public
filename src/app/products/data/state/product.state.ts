import { Page } from "../../../shared/models/page";
import { Product } from "../../../shared/models/product";

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProductState {
  products: Page<Product>,
  loading: boolean;
  loaded: boolean;
  error: Error | null;
}

export const initialProductState: ProductState = {
  products: {
    more: false,
    content: []
  },
  loading: false,
  loaded: false,
  error: null
}
