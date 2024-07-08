import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProductComponent } from "./product.component";
import { ProductFacade } from "../data/state/product.facade";

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let facade: ProductFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [{
        provide: ProductFacade,
        useValue: jasmine.createSpyObj('ProductFacade', ['getAll'])
     }],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(ProductFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Call getAll method on ngOnInit',() => {
    expect(facade.getAll).toHaveBeenCalled();
  });

  it('Load more products',() => {
    component.loadMore();
    expect(component.currentPage$.value).toEqual(1);
  });
});
