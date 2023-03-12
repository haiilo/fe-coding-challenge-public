import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ProductService } from './products/product.service';

describe('AppComponent', () => {

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;

  let service: ProductService;
  let spy: jasmine.Spy;

  let serviceStub: any;

  let obsContent = {
    more: true,
    content: [
      { image: 'https://picsum.photos/400/400', url: 'https://picsum.photos/', description:'Images from some place', title: 'Lorem Picsum', categories: ["Images", "Random", "Other stuff"]},
      { image: 'https://picsum.photos/400/400', url: 'https://picsum.photos/', description:'Images from some place', title: 'Lorem Picsum', categories: ["Images", "Random", "Other stuff"]},
      { image: 'https://picsum.photos/400/400', url: 'https://picsum.photos/', description:'Images from some place', title: 'Lorem Picsum', categories: ["Images", "Random", "Other stuff"]},
      { image: 'https://picsum.photos/400/400', url: 'https://picsum.photos/', description:'Images from some place', title: 'Lorem Picsum', categories: ["Images", "Random", "Other stuff"]},
      { image: 'https://picsum.photos/400/400', url: 'https://picsum.photos/', description:'Images from some place', title: 'Lorem Picsum', categories: ["Images", "Random", "Other stuff"]},
      { image: 'https://picsum.photos/400/400', url: 'https://picsum.photos/', description:'Images from some place', title: 'Lorem Picsum', categories: ["Images", "Random", "Other stuff"]},
      { image: 'https://picsum.photos/400/400', url: 'https://picsum.photos/', description:'Images from some place', title: 'Lorem Picsum', categories: ["Images", "Random", "Other stuff"]},
      { image: 'https://picsum.photos/400/400', url: 'https://picsum.photos/', description:'Images from some place', title: 'Lorem Picsum', categories: ["Images", "Random", "Other stuff"]},
      { image: 'https://picsum.photos/400/400', url: 'https://picsum.photos/', description:'Images from some place', title: 'Lorem Picsum', categories: ["Images", "Random", "Other stuff"]},
      { image: 'https://picsum.photos/400/400', url: 'https://picsum.photos/', description:'Images from some place', title: 'Lorem Picsum', categories: ["Images", "Random", "Other stuff"]},
      { image: 'https://picsum.photos/400/400', url: 'https://picsum.photos/', description:'Images from some place', title: 'Lorem Picsum', categories: ["Images", "Random", "Other stuff"]},
      { image: 'https://picsum.photos/400/400', url: 'https://picsum.photos/', description:'Images from some place', title: 'Lorem Picsum', categories: ["Images", "Random", "Other stuff"]},
    ]
  }
  
  beforeEach(async () => {    
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{provide: ProductService, useValue: serviceStub}, ProductService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    de = fixture.debugElement;

    serviceStub = {
      get: () => of(obsContent)
    }
    service = de.injector.get(ProductService);
    spy = spyOn(service, "get").and.returnValue(of(obsContent));    
  });

  it('should create the app', () => {    
    expect(app).toBeTruthy();
  });

  it('loading should be false', () => {    
    expect(app.isLoading).toBeFalse;
  });

  it('page should be 1', () => {    
    expect(app.currentPage$.value).toBe(1);
  });

  it('page should subscribe to products$', () => {    
    expect(app.products$.subscribe).toBeTruthy;
  });


  it('should have content from observable', () => {    
    app.products$.subscribe(content=>{
      expect(content).toBeDefined();
      expect(content).toBe(obsContent);
    })
  });

  it('should call get one time with page number', ()=>{
    setTimeout(()=>{
      expect(spy).toHaveBeenCalledWith(app.currentPage$.value);
      expect(spy.calls.all().length).toEqual(1);
    }, 2000)
    
  })
  


});
