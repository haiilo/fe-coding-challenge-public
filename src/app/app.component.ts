import { Component } from '@angular/core';
import { Observable, BehaviorSubject, catchError, finalize, switchMap, tap, of, scan } from 'rxjs';
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

  public currentPage$ = new BehaviorSubject<number>(1);
  public errorMsg: string = "There was an error on the server";
  public more: boolean = true;
  public isError: boolean = false;
  public isLoading: boolean = false;

  readonly products$ = this.currentPage$.pipe(
    tap(() => this.isLoading = true),
    switchMap((currentPage) =>
      this.productService.get(currentPage).pipe(
        tap(() => this.isError = false),
        finalize(() => this.isLoading = false),
        catchError(err => this.errorHandling(err))
    )),
    scan((acc, value) => { return { more: value.more, content: acc.content.concat(value.content) }})
  );

  private errorHandling(err: any): Observable<Page<Product>> {
    console.error(err);
    // Wait before displaying error message (for slow connections)
    setTimeout(() => {
      this.isError = true; 
    }, 300);             
    return of();
  }

  public checkForMore(){
    this.products$.subscribe(obj => {
      this.more = obj.more;
    });
  }

  public loadMore(): void {
    this.checkForMore();

    if(this.isError) {
      this.currentPage$.next(this.currentPage$.value); 
    }

    if (this.more) {
      this.currentPage$.next(this.currentPage$.value + 1);  
    } 
  }
}
