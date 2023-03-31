import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule],
	selector: 'fe-coding-challenge-card',
	standalone: true,
	styleUrls: ['./card.component.scss'],
	templateUrl: './card.component.html',
})
export class CardComponent {
	@Input() public description?: string;
	@Input() public imageSrc: string | null;
	@Input() public title: string;
}
