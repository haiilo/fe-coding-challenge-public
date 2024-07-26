import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, finalize, Observable, tap } from 'rxjs';
import { ProductService } from './services';
import { Product } from './models';

@Injectable({
  providedIn: 'root',
})
export class AppState {
  private readonly isLoadingSubj = new BehaviorSubject<boolean>(false);
  private readonly canLoadMoreSubj = new BehaviorSubject<boolean>(false);
  private readonly productsSubj = new BehaviorSubject<Product[]>([]);
  private readonly currentPageSubj = new BehaviorSubject<number>(0);
  private readonly errorMessageSubj = new BehaviorSubject<string | undefined>(undefined);

  get isLoading$(): Observable<boolean> {
    return this.isLoadingSubj.asObservable();
  }

  get canLoadMore$(): Observable<boolean> {
    return this.canLoadMoreSubj.asObservable();
  }

  get products$(): Observable<Product[]> {
    return this.productsSubj.asObservable();
  }

  get errorMessage$(): Observable<string | undefined> {
    return this.errorMessageSubj.asObservable();
  }

  constructor(private readonly productService: ProductService) {}

  getProducts() {
    this.errorMessageSubj.next(undefined);
    this.isLoadingSubj.next(true);

    return this.productService.get(this.currentPageSubj.value).pipe(
      tap((data) => {
        this.productsSubj.next([...this.productsSubj.value, ...data.content]);
        this.canLoadMoreSubj.next(data.more);
      }),
      catchError((error) => {
        this.errorMessageSubj.next(error.message);
        return EMPTY;
      }),
      finalize(() => this.isLoadingSubj.next(false))
    );
  }

  loadMoreProducts() {
    if (!this.canLoadMoreSubj.value) return EMPTY;

    this.currentPageSubj.next(this.currentPageSubj.value + 1);

    return this.getProducts();
  }
}
