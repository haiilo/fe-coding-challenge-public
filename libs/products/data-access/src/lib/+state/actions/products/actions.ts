import type { HttpErrorResponse } from '@angular/common/http';
import { getActionType } from '@fe-coding-challenge/common/utils/redux';
import type { Page, Product } from '@fe-coding-challenge/products/types';
import { createAction, props } from '@ngrx/store';
import { FEATURE_KEY } from '../../state.constants';

export const load = createAction(getActionType(FEATURE_KEY, 'Load'));

export const get = createAction(getActionType(FEATURE_KEY, 'Get'));

export const getSuccess = createAction(
	getActionType(FEATURE_KEY, 'Get - SUCCESS'),
	props<{ data: Page<Product> }>()
);

export const getFailure = createAction(
	getActionType(FEATURE_KEY, 'Get - FAILURE'),
	props<{ error: HttpErrorResponse }>()
);
