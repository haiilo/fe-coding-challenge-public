import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { Page } from '../../interfaces/page';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  public products: Product[] = [];
  public hasError: boolean = false;
  public isLoading: boolean = true;
  public currentPage: Page<Product> | undefined;

  private currentPageIndex = 0;
  private destroyed$: Subject<void> = new Subject();

  constructor(private productService: ProductService) {
  }

  public ngOnInit(): void {
    this.loadProducts();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public openProductUrl(url: string): void {
    window.open(url, '_blank');
  }

  public loadMore(): void {
    if (this.currentPage?.more) {
      this.currentPageIndex += 1;
      this.loadProducts();
    }
  }

  public loadProducts(): void {
    this.hasError = false;
    this.isLoading = true;

    const productsObserver = {
      next: (productsPage: Page<Product>) => {
        this.currentPage = productsPage;
        this.products.push(...productsPage.content);
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      }
    };

    this.productService.get(this.currentPageIndex).pipe(takeUntil(this.destroyed$)).subscribe(productsObserver);
  }
}
