import { Component } from '@angular/core';
import {Observable, combineLatest, catchError, of, BehaviorSubject, switchMap, map, tap, concatMap, scan} from 'rxjs';
import { Page } from './products/page';
import { Product } from './products/product';
import { ProductService } from './products/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  items$!: Observable<Product[]>;
  currPage$!: BehaviorSubject<number>;
  isLoading$!: BehaviorSubject<boolean>;
  hasMore$!: BehaviorSubject<boolean>;
  hasError$!: BehaviorSubject<boolean>;

  constructor(private readonly productService: ProductService) {
    this.currPage$ = new BehaviorSubject<number>(0);
    this.isLoading$ = new BehaviorSubject(false);
    this.hasMore$ = new BehaviorSubject(false);
    this.hasError$ = new BehaviorSubject(false);
  }

  public onLoadMore() {
    this.currPage$.next(this.currPage$.value + 1);
  }

  ngOnInit() {
    this.items$ = this.currPage$.pipe(
      tap(() => {
        this.isLoading$.next(true);
        this.hasError$.next(false);
      }),
      concatMap(page => this.productService.get(page).pipe(
        tap({complete: () => {
            this.isLoading$.next(false);
          }}),
        catchError((err) => {
          this.hasError$.next(true);
          // TODO: log to sentry or some log aggregator
          return of({more: this.hasMore$.value, content:[]})
        })
      )),
      tap((page) => this.hasMore$.next(page.more)),
      map((result: Page<Product>) => result.content),
      scan((prevItems, nextItems) => {
        return prevItems.concat(nextItems)
      }, [] as Product[])
    )
  }
}
