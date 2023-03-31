import { setRemoteDefinitions } from '@nrwl/angular/mf';

void fetch('/assets/module-federation.manifest.json')
	.then((res: Response) => res.json())
	.then((definitions: Readonly<Record<string, string>>) => {
		setRemoteDefinitions(definitions);
	})
	.then(() =>
		import('./bootstrap').catch((err: unknown) => {
			console.error(err);
		})
	);
