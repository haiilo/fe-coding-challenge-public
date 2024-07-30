import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, filter, map, Observable, Subject, tap } from 'rxjs';
import { Product } from '../../products';
import * as ProductActions from '../../store/product/product.actions';
import * as ProductSelectors from '../../store/product/product.selectors';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent {
  @HostBinding('class') class = 'products';

  @ViewChild('containerRef') containerRef!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(_: any) {
    this.fixLastRow$.next(true);
  }

  readonly hasError$ = this.store.select(ProductSelectors.selectHasError);

  readonly products$: Observable<Product[] | undefined> = this.store
    .select(ProductSelectors.selectProductsPage)
    .pipe(
      tap((productsPage) => {
        this.canLoadMore.set(!productsPage ? false: productsPage.more);
        this.count = !productsPage ? 0 : productsPage.content.length;
      }),
      map((productsPage) => productsPage?.content),
      tap(() => this.fixLastRow$.next(true))
    );

  readonly fixLastRow$ = new Subject();

  canLoadMore = signal<boolean>(false);
  lastRowExtras = signal<boolean[] | undefined>([]);

  private count = 0;

  constructor(private readonly store: Store) {
    this.fixLastRow$
      .pipe(
        debounceTime(25),
        filter(() => this.count > 0),
        map(() => ({
          count: this.count,
          containerWidth: this.containerRef.nativeElement.clientWidth,
          cardWidth: this.containerRef.nativeElement.firstChild.clientWidth
        }))
      ).subscribe((payload) => {
        const lastRowExtraCount = this.getLastRowExtraCount(payload.count, payload.containerWidth, payload.cardWidth);
        this.lastRowExtras.set(lastRowExtraCount > 0 ? new Array(lastRowExtraCount) : undefined);
      });
  }

  goToProduct(url: string): void {
    window.open(url, '_blank');
  }

  loadMore(): void {
    this.store.dispatch(ProductActions.loadMoreProducts());
  }

  private getLastRowExtraCount(count: number, containerWidth: number, cardWidth: number): number {
    const cardsPerRow = Math.floor(containerWidth / cardWidth);
    const lastRowCount = count % cardsPerRow;
    const lastRowExtraCount = cardsPerRow - lastRowCount;
    return lastRowExtraCount === cardsPerRow ? 0 : lastRowExtraCount;
  }
}
