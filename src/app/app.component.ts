import { Component } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, scan, switchMap, tap } from 'rxjs';
import { Page } from './products/page';
import { Product } from './products/product';
import { ProductService } from './products/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly productService: ProductService) {}

  // readonly products$: Observable<Page<Product>> = this.productService.get(0);

  public errorMsg: string = "Loading items failed.";
  public isError: boolean = false;
  public isLoading: boolean = false;

  public currentPage$ = new BehaviorSubject<number>(1);  

  readonly products$ = this.currentPage$.pipe(
    tap(() => this.isLoading = true),
    switchMap((currentPage) => this.getData(currentPage)),
    scan((acc, value) => { return { more: value.more, content: acc.content.concat(value.content) }})
  );

  private getData = (currentPage: number): Observable<Page<Product>> => this.productService.get(currentPage).pipe(
    tap(() => this.isError = false),
    finalize(() => this.isLoading = false),
    catchError(err => this.errorHandling(err))
  );

  private errorHandling = (err: any): Observable<Page<Product>> => {
    console.error(err);
    this.isError = true;              
    return of();
  } 

  public loadMore = (): void => {
    if(this.isError) {
      this.currentPage$.next(this.currentPage$.value); 
    } else {
      this.currentPage$.next(this.currentPage$.value + 1); 
    }
  }
// router
  public goToLink = (url: string): void => { window.open(url, "_blank") };
}
