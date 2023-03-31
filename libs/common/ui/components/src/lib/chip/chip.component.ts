import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'fe-coding-challenge-chip',
	standalone: true,
	styleUrls: ['./chip.component.scss'],
	templateUrl: './chip.component.html',
})
export class ChipComponent {}
