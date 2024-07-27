import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsState } from './states';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  isLoading$ = this.state.isLoading$;
  canLoadMore$ = this.state.canLoadMore$;
  products$ = this.state.products$;
  errorMessage$ = this.state.errorMessage$;

  private destroyRef$ = inject(DestroyRef);

  constructor(private readonly state: ProductsState) {}

  ngOnInit(): void {
    this.state.getProducts().pipe(takeUntilDestroyed(this.destroyRef$)).subscribe();
  }

  loadMoreProducts() {
    this.state.loadMoreProducts().pipe(takeUntilDestroyed(this.destroyRef$)).subscribe();
  }
}
