import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastModel } from '../toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast$: Subject<ToastModel> = new Subject<ToastModel>();

  showMessage(message: string, duration: number, type: string) {
    const toastContent: ToastModel = { message, duration, type };

    this.toast$.next(toastContent);
    setTimeout(() => this.toast$.next(toastContent));
  }
}
