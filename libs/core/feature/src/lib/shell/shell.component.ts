import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterModule],
	standalone: true,
	styleUrls: ['./shell.component.scss'],
	templateUrl: './shell.component.html',
})
export class ShellComponent {}
