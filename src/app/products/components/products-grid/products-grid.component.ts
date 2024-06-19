import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, concatMap, map, Observable, of, scan, Subject, takeUntil, tap} from "rxjs";
import {Page} from "src/app/products/interfaces/page.interface";
import {Product} from "src/app/products/interfaces/product.interface";
import {ProductService} from "src/app/products/services/product.service";

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent implements OnInit, OnDestroy {

  private readonly destroyed$ = new Subject<void>()

  public ongoingRequests = 0;  // Normally, I'd use an ongoing requests interceptor and service + a spinner component to handle this, but we're not making requests in this example
  public errorState$ = new BehaviorSubject(false);  // Normally, I'd use an error interceptor and a toast component and service to show errors in a user-friendly way, but we're not making requests in this example
  public canLoadMore$ = new BehaviorSubject(true);
  public page$: BehaviorSubject<number> = new BehaviorSubject(0);
  public products$!: Observable<Product[]>;

  public constructor(
    private readonly productService: ProductService
  ) {
  }

  public ngOnInit() {
    this.products$ = this.page$.pipe(
      takeUntil(this.destroyed$),
      tap(() => {
        this.errorState$.next(false);
        this.ongoingRequests++;
      }),
      concatMap((page: number) => {
        return this.productService.get(page).pipe(
          tap({ complete: () => this.ongoingRequests-- }),
          catchError(() => {
            this.ongoingRequests--;
            this.errorState$.next(true);
            return of({ more: this.canLoadMore$.value, content: [] } as Page<Product>);
          })
        )
      }),
      tap((page: Page<Product>) => this.canLoadMore$.next(page.more)),
      map((page: Page<Product>) => page.content),
      scan((acc, products: Product[]) => acc.concat(products), [] as Product[]),
    );
  }

  public ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public loadMore() {
    this.page$.next(this.page$.value + 1);
  }
}
