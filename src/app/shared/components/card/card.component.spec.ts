import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';
import { DebugElement } from '@angular/core';

describe('CardComponent', (): void => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', (): void => {
    component.product = {
      title: 'Test Title',
      url: 'test.url',
      description: 'Test Description',
      image: 'Test Image',
      categories: ['Test Category']
    };
    if (component.product) {
      component.product.title = 'Test Title';
    }
    fixture.detectChanges();
    const cardTitle: DebugElement = fixture.debugElement.query(By.css('.card-title'));
    expect(cardTitle.nativeElement.textContent).toBe('Test Title');
  });

  it('should call click method when card is clicked', (): void => {
    spyOn(component, 'openProductUrl');
    const cardElement: DebugElement = fixture.debugElement.query(By.css('.card'));
    cardElement.triggerEventHandler('click', null);
    expect(component.openProductUrl).toHaveBeenCalled();
  });

  it('should open product url when openProductUrl is called', (): void => {
    const openSpy = spyOn(window, 'open');
    component.product = {
      title: 'Test Title',
      description: 'Test Description',
      categories: ['Test Category'],
      image: 'Test Image',
      url: 'https://test.com'
    };
    component.openProductUrl();
    expect(openSpy).toHaveBeenCalledWith('https://test.com', '_blank');
  });

  it('should not call window.open when product is null', (): void => {
    const openSpy = spyOn(window, 'open');
    component.product = undefined;
    component.openProductUrl();
    expect(openSpy).not.toHaveBeenCalled();
  });
});
