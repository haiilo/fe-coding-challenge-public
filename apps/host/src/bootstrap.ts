import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
	provideRouter,
	withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { INTERCEPTORS_PROVIDERS } from '@fe-coding-challenge/common/utils/interceptors';
import { STORE_PROVIDERS } from '@fe-coding-challenge/common/utils/redux';
import { AppComponent } from './app/app.component';
import { ROUTES } from './app/app.routes';

bootstrapApplication(AppComponent, {
	providers: [
		...INTERCEPTORS_PROVIDERS,
		...STORE_PROVIDERS,
		provideAnimations(),
		provideRouter(ROUTES, withEnabledBlockingInitialNavigation()),
	],
}).catch((err: unknown) => {
	console.error(err);
});
