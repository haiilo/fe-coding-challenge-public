import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { ToastModel } from '../toast.model';

describe('ToastService', (): void => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });

  it('should emit a new toast message when showMessage is called', (done: DoneFn): void => {
    const toast: ToastModel = { message: 'Test message', duration: 3000, type: 'info' };
    let isFirstEmission = true;

    service.toast$.subscribe((emittedToast: ToastModel): void => {
      expect(emittedToast).toEqual(toast);
      if (isFirstEmission) {
        done();
        isFirstEmission = false;
      }
    });

    if (toast.type != null) {
      service.showMessage(toast.message, toast.duration, toast.type);
    }
  });
});
