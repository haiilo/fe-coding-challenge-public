import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { delay, of } from "rxjs";
import { faker } from '@faker-js/faker';
import { ProductService } from "./products/product.service";
import {CardComponent} from "./card/card.component";
import {TagsComponent} from "./tags/tags.component";
import {CardImageComponent} from "./card-image/card-image.component";


describe('AppComponent', () => {

  let prodService: any;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let DELAY_TIMEOUT = 100;
  let PAGE_SIZE = 12;

  beforeEach(fakeAsync( () => {
    prodService = jasmine.createSpyObj('ProductService', ['get']);

    const contentItems = []
    for(let i = 0; i < PAGE_SIZE; i++) {
      contentItems.push({
        id: faker.string.uuid(),
        title: faker.lorem.sentence({min: 1, max: 10}),
      });
    }

    prodService.get.and.returnValue(of({ more: faker.datatype.boolean(), content: contentItems }).pipe(delay(DELAY_TIMEOUT)));

    TestBed.configureTestingModule({
      declarations: [AppComponent, CardComponent, TagsComponent, CardImageComponent],
      providers: [{provide: ProductService, useValue: prodService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
    tick(DELAY_TIMEOUT);
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should display items', fakeAsync(() => {
    // first page
    fixture.detectChanges();
    let cards = fixture.nativeElement.querySelectorAll('.card');
    expect(cards.length).toEqual(PAGE_SIZE);

    // load second page
    app.onLoadMore();
    tick(DELAY_TIMEOUT);
    fixture.detectChanges();
    cards = fixture.nativeElement.querySelectorAll('.card');
    expect(cards.length).toEqual(PAGE_SIZE * 2);
  }));

  // TODO: fix flaky test
  it('should disable the load more button if there are no more pages', fakeAsync(() => {
    app.hasMore$.next(false);
    tick(DELAY_TIMEOUT);
    fixture.detectChanges();

    const loadMoreButton = fixture.nativeElement.querySelector('.load-more-button');
    expect(loadMoreButton.disabled).toBeTrue();
  }))

//   TODO: write similar tests for all components where you don't interfere with the implementation details. Due to time constraints the testing is not complete.

});
