import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CardsState } from './cards.reducer';

export const selectCards = (state: AppState) => state.cards;
export const selectAllCards = createSelector(
    selectCards,
    (state: CardsState) => state.cards
);

export const selectAllCardsPage = createSelector(
    selectCards,
    (state: CardsState) => state.page
);

export const selectAllCardsStatus = createSelector(
    selectCards,
    (state: CardsState) => state.status
);

export const selectAllCardsError = createSelector(
    selectCards,
    (state: CardsState) => state.error
);