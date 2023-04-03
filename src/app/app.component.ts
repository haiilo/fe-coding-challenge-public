import { Component } from '@angular/core';
import { Observable, BehaviorSubject, switchMap, map, scan, catchError, of, EMPTY } from 'rxjs';
import { Page } from './products/page';
import { Product } from './products/product';
import { ProductService } from './products/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly productService: ProductService) { }

  isLoading: boolean = true;
  buttonVisible: boolean = false;
  page$ = new BehaviorSubject<number>(1);

  products$: Observable<Product[]> = this.page$.pipe(
    switchMap((page) =>
      this.productService.get(page)
    ),
    catchError(() => {
      window.alert('Error getting data...')
      return EMPTY;
    }),
    map((res: Page<Product>) => {
      console.log(res.content.length)
      this.isLoading = false;
      this.buttonVisible = res.more;
      return res.content;
    }),

    scan((acc, value) => [...acc, ...value])
  );

  loadMore() {
    this.isLoading = true;
    this.page$.next(this.page$.value + 1)
  }
}
