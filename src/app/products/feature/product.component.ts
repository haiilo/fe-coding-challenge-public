import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductFacade } from "../data/state/product.facade";
import { Product } from "src/app/shared/models/product";
import { Page } from "src/app/shared/models/page";
import { BehaviorSubject, Observable, Subject, takeUntil, tap } from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  constructor(private readonly facade: ProductFacade) {}

  private unsubscribe = new Subject<void>();
  currentPage$ = new BehaviorSubject<number>(0);

  products$: Observable<Page<Product>> = this.facade.products$;

  more$: Observable<boolean> = this.facade.more$;

  ngOnInit(): void {
    this.currentPage$.pipe(
      tap((currentPage: number) => {
        this.facade.getAll(currentPage)
      }),
      takeUntil(this.unsubscribe)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadMore(): void {
    this.currentPage$.next(this.currentPage$.value + 1);
  }
}
