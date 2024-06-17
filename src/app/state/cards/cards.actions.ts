import { createAction, props } from '@ngrx/store';
import { Product } from '../../products/product';
import { Page } from '../../products/page';

export const loadCards = createAction('[Cards Page] Load Cards');

export const loadCardsSuccess = createAction(
  '[Cards Page] Cards Load Success',
  props<{ cards: Page<Product> }>()
);

export const loadCardsFailure = createAction(
  '[Cards Page] Cards Load Failure',
  props<{ error: string }>()
);