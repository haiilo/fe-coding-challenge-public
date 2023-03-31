import type { Route } from '@angular/router';
import { STORE_PROVIDERS } from '@fe-coding-challenge/products/data-access';
import { ListComponent } from './list/list.component';

export const ROUTES: Route[] = [
	{
		component: ListComponent,
		path: '',
		providers: [...STORE_PROVIDERS],
	},
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: '',
	},
];
