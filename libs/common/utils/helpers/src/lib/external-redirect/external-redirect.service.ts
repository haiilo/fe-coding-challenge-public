import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExternalRedirectService {
	constructor(@Inject(DOCUMENT) private readonly document: Document) {}

	private get window(): Window | null {
		return this.document.defaultView;
	}

	public redirect(url: string, target: string = '_blank'): Promise<boolean> {
		// eslint-disable-next-line @typescript-eslint/typedef
		return new Promise<boolean>((resolve, reject): void => {
			try {
				resolve(!!this.window?.open(url, target));
			} catch (e) {
				reject(e);
			}
		});
	}
}
