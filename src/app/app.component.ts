import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {toObservable} from "@angular/core/rxjs-interop";
import {catchError, mergeMap, Observable, scan, tap} from 'rxjs';

import {Product} from './models/product';
import {ProductService} from './services/product.service';
import {Page} from "./models/page";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // protected products: Product[] = [];
  // private currentPage: number = 0;
  private page: WritableSignal<number> = signal(0);
  private page$: Observable<number> = toObservable(this.page);
  protected products$: Observable<Product[]> | undefined;
  protected isLoading: boolean = true;
  protected hasReachedFinalProducts: boolean = false;

  constructor(private readonly productService: ProductService) {
  }

  ngOnInit(): void {
    // this.getInitialProducts();
    this.getProducts();
  }

  getProducts(): void {
    const pageSize: number = 12;

    this.products$ = this.page$.pipe(
      mergeMap((page: number) => this.productService.get(page)),
      tap((res: Page<Product>) => this.hasReachedFinalProducts = res.content.length < pageSize), // disable the "load more" button if there are fewer products than the expected page size (12)
      catchError((err, retryResponse) => { // by putting the catchError operator before the scan operator, the call will be retried and the new response will be sent downstream
        this.isLoading = false;
        return retryResponse; // catch the error and retry the call
      }),
      scan((acc: Product[], elements: Page<Product>)  => acc.concat(elements.content), <Product[]>[]), // add the content of the new response to the existing products
      tap(() => this.isLoading = false) // hide the loading spinner
    )
  }

  // getInitialProducts(): void {
  // this.productService.get(0).pipe(take(1)).subscribe((res: Page<Product>) => {
  //   this.products = res.content;
  // });
  // this.products$ = this.productService.get(0);
  // }

  loadNextPage(): void {
    this.isLoading = true;
    // this.currentPage++;

    // this.productService.get(this.currentPage).pipe(take(1)).subscribe((res: Page<Product>) => {
    //   this.products = this.products.concat(res.content);
    // this.isLoading = false;
    // })

    this.page.update(value => value + 1);
  }
}

/**
 * commented code is a (less reactive) variant for the implementation of the "load more" functionality.
 * */

