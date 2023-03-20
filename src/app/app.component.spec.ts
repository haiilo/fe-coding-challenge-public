import { TestBed } from '@angular/core/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CardsComponent } from './products/cards/cards.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSpinnerModule],
      declarations: [AppComponent, CardsComponent, ErrorPageComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
