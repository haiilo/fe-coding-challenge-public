import { createReducer, on } from '@ngrx/store';
import {
  loadCards,
  loadCardsSuccess,
  loadCardsFailure,
} from './cards.actions';
import { Product } from '../../products/product';
import { Page } from '../../products/page';

export interface CardsState {
  cards: Page<Product>;
  page: number;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: CardsState = {
  cards: { more: false, content: [] },
  page: 0,
  error: null,
  status: 'pending',
};

export const cardsReducer = createReducer(
  initialState,
  on(loadCards, (state) => ({ ...state, status: 'loading' as const })),
  on(loadCardsSuccess, (state, { cards }) => ({
    ...state,
    cards: { more: cards.more, content: [...state.cards.content, ...cards.content] },
    page: state.page+1,
    error: null,
    status: 'success' as const,
  })),
  on(loadCardsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as const,
  }))
);