import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { of } from 'rxjs';
import { ToastService } from '../../core/services/toast.service';

describe('ToastComponent', (): void => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [
        {
          provide: ToastService,
          useValue: {
            toast$: of({message: 'Test message', duration: 3000, type: 'info'}),
            showMessage: jasmine.createSpy('showMessage')
          }
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to toast$ in ngOnInit', (): void => {
    component.ngOnInit();
    expect(component.toast).toEqual({message: 'Test message', duration: 3000, type: 'info'});
  });

  it('should set toast to null when close is called', (): void => {
    component.close();
    expect(component.toast).toBeNull();
  });
});
