import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import {
	ButtonComponent,
	CardComponent,
	ChipComponent,
	SpinnerComponent,
} from '@fe-coding-challenge/common/ui/components';
import { ExternalRedirectService } from '@fe-coding-challenge/common/utils/helpers';
import type { Product } from '@fe-coding-challenge/products/types';
import type { Observable } from 'rxjs';
import { ListService } from './list.service';
import type { ListData } from './list.types';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		ButtonComponent,
		CardComponent,
		ChipComponent,
		CommonModule,
		SpinnerComponent,
	],
	providers: [ListService],
	standalone: true,
	styleUrls: ['./list.component.scss'],
	templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
	public data$: Observable<ListData> = this.listService.data$;

	constructor(
		private readonly externalRedirectService: ExternalRedirectService,
		private readonly listService: ListService
	) {}

	public ngOnInit(): void {
		this.dispatchLoadProducts();
	}

	public uniqueIdentifier(index: number, product?: Product): string {
		return product?.id ?? index.toString();
	}

	public openItem(event: Event, url: string): void {
		event.stopPropagation();

		void this.externalRedirectService.redirect(url);
	}

	public loadMore(event: Event): void {
		event.stopPropagation();

		this.dispatchLoadProducts();
	}

	private dispatchLoadProducts(): void {
		this.listService.dispatchLoadProducts();
	}
}
