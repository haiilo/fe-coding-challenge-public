import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, scan, switchMap, tap } from 'rxjs';
import { Page } from '../page';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
    readonly products$: Observable<Page<Product>>;

    private _currentPage$ = new BehaviorSubject<number>(0);
    readonly currentPage$: Observable<number> = this._currentPage$.asObservable();

    private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    readonly loading$: Observable<boolean> = this._loading$.asObservable();

    private _error$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    readonly error$: Observable<string | null> = this._error$.asObservable();

    private _more$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    readonly more$: Observable<boolean> = this._more$.asObservable();

    constructor(private readonly productService: ProductService) {
        this.products$ = this._currentPage$.pipe(
            tap(() => {
                this._loading$.next(true);
                this._error$.next(null);
            }),
            switchMap((page) =>
                this.productService.get(page).pipe(
                    catchError((err) => {
                        this._error$.next(err.message);
                        return of({ more: true, content: [] } as Page<Product>);
                    })
                )
            ),
            scan(
                (previous, page) => {
                    return {
                        more: page.more,
                        content: [...previous.content, ...page.content],
                    };
                },
                { more: true, content: [] } as Page<Product>
            ),
            tap((page) => {
                this._loading$.next(false);
                this._more$.next(page.more);
            })
        );
    }

    ngOnInit() {
        this.loadMore();
    }

    ngOnDestroy() {
        this._currentPage$.complete();
        this._loading$.complete();
        this._error$.complete();
        this._more$.complete();
    }

    loadMore() {
        if (!this._loading$.value && this._more$.value) {
            const currentPage = this._currentPage$.value;
            this._currentPage$.next(!!this._error$.value ? currentPage : currentPage + 1);
        }
    }
}
