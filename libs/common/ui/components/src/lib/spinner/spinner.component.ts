import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'fe-coding-challenge-spinner',
	standalone: true,
	styleUrls: ['./spinner.component.scss'],
	template: '',
})
export class SpinnerComponent {}
