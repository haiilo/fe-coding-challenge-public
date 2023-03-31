import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	Input,
	ViewEncapsulation,
} from '@angular/core';
import { SpinnerComponent } from '../spinner';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [CommonModule, SpinnerComponent],
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: '[feCodingChallengeButton]',
	standalone: true,
	styleUrls: ['./button.component.scss'],
	templateUrl: './button.component.html',
})
export class ButtonComponent {
	@Input() public disabled?: boolean;
	@Input() public isLoading?: boolean;

	@HostBinding('attr.disabled') public get disabledAttribute(): boolean | null {
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
		return this.disabled || this.isLoading || null;
	}

	@HostBinding('class') public get classes(): string {
		return [
			'button',
			this.disabled || this.isLoading ? 'button--disabled' : undefined,
		]
			.filter((cssClass: string | undefined) => !!cssClass)
			.join(' ');
	}
}
