import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, OnDestroy, OnInit
} from '@angular/core';
import { BehaviorSubject, retry, Subject, takeUntil } from 'rxjs';
import { PageStatusEnum } from './enums';
import { Page, Product } from './interfaces';
import { ProductService } from './services';

import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn, fadeOut } from 'ng-animate';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition(':enter', useAnimation(fadeIn, {
        params: { timing: 0.8, delay: 0 }
      })),
      transition(':leave', useAnimation(fadeOut))
    ])
  ],
})
export class ProductsComponent implements OnInit, OnDestroy {

  // Data
  public readonly pageData$: BehaviorSubject<Product[]> = new BehaviorSubject([] as Product[]);

  // Page status
  public pageStatus: PageStatusEnum = PageStatusEnum.Loading;
  public pageStatusMessage: string = '';

  // Helpers
  public showLoadMore: boolean = true;
  private _pageNumber: number = 1;

  // Unsubscribe
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly _productService: ProductService,
    private _cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._getData();
  }

  getMore(): void {
    this._pageNumber++;
    this._getData();
  }

  _getData(): void {
    this._updatePageStatus(PageStatusEnum.Loading);

    this._productService
      .get(this._pageNumber)
      .pipe(
        takeUntil(this.destroy$),
        retry({ count: 3, delay: 100, resetOnSuccess: true })
      )
      .subscribe({
        next: (data: Page<Product>) => this._handleSuccess(data),
        error: (error: Error) => this._handleError(error),
      });
  }

  private _handleError(error: Error): void {
    this._pageNumber--;
    // console.error('[Products Error]', error.message);
    this._updatePageStatus(PageStatusEnum.Error, error);
  }

  private _handleSuccess(data: Page<Product>): void {
    this.showLoadMore = data.more;

    const moreProducts: Product[] = [
      ...this.pageData$.getValue(),
      ...data.content,
    ];

    this.pageData$.next(moreProducts);
    this._updatePageStatus(PageStatusEnum.Success);
  }

  private _updatePageStatus(status: any, error?: Error): void {
    this.pageStatusMessage = error?.message || '';
    this.pageStatus = status;
    this._cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
