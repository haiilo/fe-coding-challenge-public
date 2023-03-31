import type { Route } from '@angular/router';
import {
	type LoadChildrenModule,
	ShellPath,
} from '@fe-coding-challenge/common/types';
import { ShellComponent } from './shell/shell.component';

export const ROUTES: Route[] = [
	{
		children: [
			{
				loadChildren: () =>
					import('@fe-coding-challenge/products/feature').then(
						(m: LoadChildrenModule) => m.ROUTES
					),
				path: ShellPath.PRODUCTS,
			},
			{
				path: '**',
				pathMatch: 'full',
				redirectTo: ShellPath.PRODUCTS,
			},
		],
		component: ShellComponent,
		path: '',
	},
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: '',
	},
];
