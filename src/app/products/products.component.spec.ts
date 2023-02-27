import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { AlertComponent, TagComponent } from '../shared/components';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';
import { PageStatusEnum } from './enums';
import { Page, Product } from './interfaces';
import { ProductsComponent } from './products.component';
import { ProductService } from './services';

describe('ProductsComponent', () => {
  let service: ProductService;
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AlertComponent,
        TagComponent,
        SpinnerComponent,
        BrowserAnimationsModule,
      ],
      declarations: [ProductsComponent],
      providers: [ProductService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    service = TestBed.inject(ProductService);
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component = null as any;
    fixture = null as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component['_pageNumber']).toBe(1);
    expect(component.pageData$.value).toEqual([]);
    expect(component.pageStatus).toBe(PageStatusEnum.Loading);
    expect(component.pageStatusMessage).toBe('');
    expect(component.showLoadMore).toBe(true);
  });

  describe('getMore()', () => {
    const mockedProduct: Product[] = [
      {
        url: 'test',
        title: 'test',
        description: 'test',
        image: 'test',
        categories: ['test'],
      },
    ];
    const mockedPagedProduct: Page<Product> = {
      more: true,
      content: mockedProduct,
    };
    // const mockedError: Error = { message: 'Test error'};

    it('should increment pageNumber correctly', () => {
      expect(component['_pageNumber']).toBe(1);
      component.getMore();
      expect(component['_pageNumber']).toBe(2);
    });

    it('should fetch more data', fakeAsync(() => {
      spyOn(service, 'get').and.returnValue(of(mockedPagedProduct));
      component.getMore();

      expect(component.pageData$.value).toEqual(mockedProduct);
    }));

    it('should update page status correctly on success', fakeAsync(() => {
      expect(component.pageStatus).toBe(PageStatusEnum.Loading);

      spyOn(service, 'get').and.returnValue(of(mockedPagedProduct));
      component.getMore();

      expect(component.pageStatus).toBe(PageStatusEnum.Success);
    }));

    it('should update page status correctly on error', fakeAsync(() => {
      expect(component.pageStatus).toBe(PageStatusEnum.Loading);

      spyOn(service, 'get').and.returnValue(
        throwError(() => new Error('400 Bad Request'))
      );
      component.getMore();

      // Wait for rxjs retry({ count: 3, delay: 100, resetOnSuccess: true })
      flush();
      tick(300);

      expect(component.pageStatus).toBe(PageStatusEnum.Error);
    }));
  });
});
