import type { Route } from '@angular/router';
import type { LoadChildrenModule } from '@fe-coding-challenge/common/types';

export const ROUTES: Route[] = [
	{
		loadChildren: () =>
			import('@fe-coding-challenge/core/feature').then(
				(m: LoadChildrenModule) => m.ROUTES
			),
		path: '',
	},
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: '',
	},
];
