import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterModule],
	selector: 'fe-coding-challenge-host-root',
	standalone: true,
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.html',
})
export class AppComponent {}
