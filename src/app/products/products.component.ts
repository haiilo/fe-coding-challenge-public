import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, forkJoin, map, Observable, of, scan, switchMap, tap } from 'rxjs';
import { Page } from './page';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  @ViewChild('container') container?: ElementRef;

  public products$!: Observable<Page<Product>>;

  public page$ = new BehaviorSubject<number>(0);

  public isLoading = false;

  public error?: string | null;

  constructor(private readonly productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.page$.pipe(
      tap(() => {
        this.error = null;
        this.isLoading = true;
      }),
      switchMap(page => this.productService.get(page)
        .pipe(catchError((error) => {
          this.error = error;
          return of({ more: true, content: [] as Product[] });
        }))
      ),
      tap(() => this.isLoading = false),
      scan((acc, val) => ({
        more: val.more,
        content: [...acc.content, ...val.content]
      })),
      tap(() => this.scrollToBottom())
    );
  }

  public loadMore() {
    let page = this.page$.value + 1;

    if (this.error) {
      this.error = null
      page -= 1;

    }

    this.page$.next(page);
  }

  private scrollToBottom() {
    setTimeout(() => {
      this.container?.nativeElement.scrollIntoView({
        behaviour: 'smooth',
        block: 'end',
      })
    });
  }
}
