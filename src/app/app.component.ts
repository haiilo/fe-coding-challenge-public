import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from './products/page';

import { ProductStateService } from './products/product-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  products$ = this.productStateService.products$;
  loading$ = this.productStateService.loading$;
  error$ = this.productStateService.error$;
  more$ = this.productStateService.more$;

  constructor(private productStateService: ProductStateService) {}
  ngOnInit() {
    this.productStateService.loadMore();
  }

  loadMore() {
    this.productStateService.loadMore();
  }

}
