import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, finalize, Observable, tap } from 'rxjs';
import { Product } from './products/product';
import { ProductService } from './products/product.service';

@Injectable({
  providedIn: 'root',
})
export class AppState {
  private readonly isLoadingSubj = new BehaviorSubject<boolean>(false);
  private readonly canLoadMoreSubj = new BehaviorSubject<boolean>(false);
  private readonly productsSubj = new BehaviorSubject<Product[]>([]);
  private readonly currentPageSubj = new BehaviorSubject<number>(0);

  get isLoading$(): Observable<boolean> {
    return this.isLoadingSubj.asObservable();
  }

  get canLoadMore$(): Observable<boolean> {
    return this.canLoadMoreSubj.asObservable();
  }

  get products$(): Observable<Product[]> {
    return this.productsSubj.asObservable();
  }

  constructor(private readonly productService: ProductService) {}

  getProducts() {
    this.isLoadingSubj.next(true);

    return this.productService.get(this.currentPageSubj.value).pipe(
      tap((data) => {
        this.productsSubj.next([...this.productsSubj.value, ...data.content]);
        this.canLoadMoreSubj.next(data.more);
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
