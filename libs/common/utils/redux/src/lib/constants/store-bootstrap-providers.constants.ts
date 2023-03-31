import { HttpClientModule } from '@angular/common/http';
import {
	type EnvironmentProviders,
	importProvidersFrom,
	isDevMode,
} from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const STORE_PROVIDERS: EnvironmentProviders[] = [
	importProvidersFrom(HttpClientModule),
	provideEffects(),
	provideRouterStore(),
	provideStore(
		{
			router: routerReducer,
		},
		{
			runtimeChecks: {
				strictActionImmutability: true,
				strictActionTypeUniqueness: true,
				strictActionWithinNgZone: true,
				strictStateImmutability: true,
			},
		}
	),
	provideStoreDevtools({
		logOnly: !isDevMode(),
		maxAge: 25,
	}),
];
