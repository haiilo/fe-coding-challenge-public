import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class AlertComponent {

  @Input() text: string = '';
  @Input() type: 'info' | 'warning' | 'success' | 'danger' = 'info';
  @Input() showIcon: boolean = true;

}
