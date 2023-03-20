import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorPageComponent } from 'src/app/error-page/error-page.component';
import { ProductService } from '../product.service';
import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  let errorComponent: ErrorPageComponent;
  let errorFixture: ComponentFixture<ErrorPageComponent>;
  let productService: ProductService;
  let spinner: NgxSpinnerService;

  beforeEach(async () => {
    productService = new ProductService;
    spinner = new NgxSpinnerService;
    await TestBed.configureTestingModule({
      declarations: [ CardsComponent, ErrorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsComponent);
    errorFixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    errorComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create cards component', () => {            
    expect(component).toBeTruthy();   
  });

  it("should call for products on init, populate array of products or show error; check loading spinner", () => {
    let products$ = component.products$;
    let productArray = component.productArray;
    let errorMessage = component.errorMessage;
    let spinnerSpyShow = spyOn(TestBed.get(NgxSpinnerService), "show");
    let spinnerSpyHide = spyOn(TestBed.get(NgxSpinnerService), "hide");

    component.ngOnInit();

    expect(spinnerSpyShow).toHaveBeenCalled();
    products$.subscribe({
      next: (product) => {
        expect(productArray = product.content);
      },
      error: () => {
        expect(errorMessage).toBe('Something went bad:( Please reload the page!');
        expect(spinnerSpyHide).toHaveBeenCalled;   
        expect(errorComponent).toBeTruthy();
      },
      complete: () => {
        expect(spinnerSpyHide).toHaveBeenCalled;
      }
    })
  });

  it('should check loadMore is called at click', fakeAsync(() => {
    component.loading$.next(false);
    fixture.detectChanges();
    let loadMoreSpy = spyOn(component, 'loadMore');
    let loadMoreButton = fixture.debugElement.query(By.css('.more')).nativeElement;
    loadMoreButton.click();
    expect(loadMoreSpy).toHaveBeenCalled(); 
  }));
});
