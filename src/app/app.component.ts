import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  catchError,
  concat,
  finalize,
  map,
  Observable,
  of, shareReplay,
  startWith,
  Subject,
  switchMap,
  tap
} from 'rxjs';
import { Page } from './products/page';
import { Product } from './products/product';
import { ProductService } from './products/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public isLoading = false;

  private page = 0;
  private readonly loadNextPageSubject$ = new Subject<void>();
  private productsData: Product[] = [];

  public readonly products$: Observable<Page<Product>> = concat(
    of({ more: true, content: [] }),
    this.loadNextPageSubject$.pipe(
      // load 0 page immediately
      startWith(of(null)),
      tap(() => {
        this.isLoading = true;
      }),
      switchMap(() => this.productService.get(this.page).pipe(
        finalize(() => this.isLoading = false),
        catchError((e) => {
          this.snackBar.open(e, 'Close');
          if (this.page > 0) {
            this.page -= 1;
          }
          return of({ more: true, content: [] });
        }),
      )),
      map((uploadedData) => ({
        ...uploadedData,
        content: [...this.productsData, ...uploadedData.content],
      })),
      tap((uploadedData) => {
        this.productsData = uploadedData.content
      }),
    )).pipe(shareReplay({bufferSize: 1, refCount: true}));

  constructor(private readonly productService: ProductService, private snackBar: MatSnackBar) {}

  public loadNextPage(): void {
    this.page += 1;
    this.loadNextPageSubject$.next();
  }

  public trackByFn(index: number, product: Product): string {
    return product.url;
  }
}
