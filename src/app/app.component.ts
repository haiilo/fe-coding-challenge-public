import { Component } from '@angular/core';
import { ToastService } from './shared/core/services/toast.service';
import { Subject } from 'rxjs';
import { ToastModel } from './shared/core/toast.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  toast$: Subject<ToastModel>;

  constructor(private toastService: ToastService) {
    this.toast$ = this.toastService.toast$;
  }
}
