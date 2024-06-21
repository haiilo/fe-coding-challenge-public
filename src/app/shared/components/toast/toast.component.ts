import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { ToastType } from '../../core/enums/toast-type.enum';
import { ToastModel } from '../../core/toast.model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() toast: ToastModel | null = null;

  protected readonly ToastType = ToastType;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toast$.subscribe((toastResponse: ToastModel) => {
      this.toast = toastResponse
    });
  }

  close(): void {
    this.toast = null;
  }
}
