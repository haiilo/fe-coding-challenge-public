import type { HttpErrorResponse } from '@angular/common/http';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productsAdapter, type State } from '../reducers';
import { FEATURE_KEY } from '../state.constants';

const getState = createFeatureSelector<State>(FEATURE_KEY);

const { selectAll } = productsAdapter.getSelectors();

export const getCurrentPage = createSelector(
	getState,
	(state: State): number => state.currentPage
);
export const getError = createSelector(
	getState,
	(state: State): HttpErrorResponse | null => state.error
);
export const getHasMoreResults = createSelector(
	getState,
	(state: State): boolean => state.hasMoreResults
);
export const getIsLoading = createSelector(
	getState,
	(state: State): boolean => state.isLoading
);
export const getProducts = createSelector(getState, selectAll);
