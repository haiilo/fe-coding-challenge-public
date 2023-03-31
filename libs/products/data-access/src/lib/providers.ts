import type { EnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { effects, FEATURE_KEY, reducer } from './+state';

export const STORE_PROVIDERS: EnvironmentProviders[] = [
	provideEffects(effects),
	provideState(FEATURE_KEY, reducer),
];
