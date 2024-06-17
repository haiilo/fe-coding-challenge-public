import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule, MemoizedSelector } from '@ngrx/store';
import { of } from 'rxjs';
import { CardsComponent } from './cards.component';
import { loadCards } from '../state/cards/cards.actions';
import { AppState } from '../state/app.state';
import { selectAllCards } from '../state/cards/cards.selectors';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CheckImage } from "../pipes/check-image.pipe";


describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  let store: jasmine.SpyObj<Store<AppState>>;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    store.select.and.callFake((selector: MemoizedSelector<AppState, any>) => {
      if (selector === selectAllCards) {
        return of({
          content: [
            { title: 'Test Card', description: 'Test Description', url: 'http://test.com', image: 'http://test.com/image.jpg', categories: ['Category1', 'Category2'] }
          ],
          more: true
        });
      }
      return of(undefined);
    });

    await TestBed.configureTestingModule({
      declarations: [CardsComponent, CheckImage],
      imports: [StoreModule.forRoot({})],
      providers: [
        { provide: Store, useValue: store }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    dispatchSpy = store.dispatch;

    fixture.detectChanges();
  });

  it('should create cards', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadCards on ngOnInit', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(loadCards());
  });

  it('should bind allCards$ observable to the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-content h3')?.textContent).toContain('Test Card');
    expect(compiled.querySelector('.card-content p')?.textContent).toContain('Test Description');
  });

  it('should dispatch loadCards on loadMore button click', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('.more') as HTMLElement;
    button.click();
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(loadCards());
  });

  it('should call goToUrl with correct URL', () => {
    spyOn(component, 'goToUrl');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('.card');
    card?.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.goToUrl).toHaveBeenCalledWith('http://test.com');
  });
});
