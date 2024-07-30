import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ProductSelectors from './store/product/product.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  readonly isLoading$: Observable<boolean> = this.store
    .select(ProductSelectors.selectIsLoading);

  constructor(private readonly store: Store) {}
}
