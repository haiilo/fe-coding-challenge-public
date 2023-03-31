import type { Route } from '@angular/router';
import {
	type LoadChildrenModule,
	ShellPath,
} from '@fe-coding-challenge/common/types';
import { loadRemoteModule } from '@nrwl/angular/mf';

export const ROUTES: Route[] = [
	{
		loadChildren: () =>
			loadRemoteModule('core', './Routes').then(
				(m: LoadChildrenModule) => m.ROUTES
			),
		path: ShellPath.DASHBOARD,
	},
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: '',
	},
];
