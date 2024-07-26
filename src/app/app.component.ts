import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppState } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading$ = this.state.isLoading$;
  canLoadMore$ = this.state.canLoadMore$;
  products$ = this.state.products$;
  errorMessage$ = this.state.errorMessage$;

  private destroyRef$ = inject(DestroyRef);

  constructor(private readonly state: AppState) {}

  ngOnInit(): void {
    this.state.getProducts().pipe(takeUntilDestroyed(this.destroyRef$)).subscribe();
  }

  loadMoreProducts() {
    this.state.loadMoreProducts().pipe(takeUntilDestroyed(this.destroyRef$)).subscribe();
  }
}
