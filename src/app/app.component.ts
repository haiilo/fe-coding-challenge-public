import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppState } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  readonly isLoading$ = this.state.isLoading$;
  readonly canLoadMore$ = this.state.canLoadMore$;
  readonly products$ = this.state.products$;
  readonly errorMessage$ = this.state.errorMessage$;

  private readonly destroyRef$ = inject(DestroyRef);

  constructor(private readonly state: AppState) {}

  ngOnInit(): void {
    this.state.getProducts().pipe(takeUntilDestroyed(this.destroyRef$)).subscribe();
  }

  loadMoreProducts() {
    this.state.loadMoreProducts().pipe(takeUntilDestroyed(this.destroyRef$)).subscribe();
  }
}
