import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as ProductSelectors from './store/product/product.selectors';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { ProductState } from './store/product/product.reducer';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;

  const initialState: ProductState = { productsPage: { content: [], more: false }, page: 0, isLoading: false, hasError: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterModule,
        StoreModule.forRoot({})
      ],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should output the correct value from isLoading$ store selector`, () => {

    store.overrideSelector(ProductSelectors.selectIsLoading, true);

    const observerSpy = subscribeSpyTo(component.isLoading$);

    const isLoading = observerSpy.getLastValue();
    expect(isLoading).toEqual(true);

    observerSpy.unsubscribe();
  });

  it(`should show loader when store emits that it's loading`, fakeAsync(() => {

    store.overrideSelector(ProductSelectors.selectIsLoading, true);

    const observerSpy = subscribeSpyTo(component.isLoading$);

    tick(250);
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.loader'));
    expect(el).toBeTruthy();

    observerSpy.unsubscribe();
  }));

  it(`should not show loader when store emits that it's not loading`, fakeAsync(() => {

    store.overrideSelector(ProductSelectors.selectIsLoading, false);

    const observerSpy = subscribeSpyTo(component.isLoading$);

    tick(250);
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.loader'));
    expect(el).toBeFalsy();

    observerSpy.unsubscribe();
  }));
});
