import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ProductsModule, SharedModule]
    }).compileComponents();
  });

  it('should create the app', (): void => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
