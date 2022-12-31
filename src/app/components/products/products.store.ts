import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { catchError, exhaustMap, map, Observable, tap } from "rxjs";
import { Product } from "src/app/models/product";
import { MessageService } from "src/app/services/message.service";
import { ProductService } from "src/app/services/product.service";

export interface ProductsState {
    products: Product[];
    loading: boolean;
    hasMore: boolean;
}
  
const defaultState: ProductsState = {
    products: [],
    loading: false,
    hasMore: false
};

@Injectable()
export class ProductsStore extends ComponentStore<ProductsState> {

    private pageNo: number = 0;
 
    constructor(
        private readonly productService: ProductService,
        private readonly messageService: MessageService
    ) {
        super(defaultState);

        this.loadMore();
    }
  
    readonly products$ = this.select(({ products }) => products);
    readonly loading$ = this.select(({ loading }) => loading);
    readonly couldLoadMore$ = this.select(({ hasMore, loading }) => hasMore && !loading);

    readonly loadMore = this.effect<void>((loadMore$: Observable<void>) => {
        return loadMore$.pipe(
            tap(() => this.setLoading(true)),
            exhaustMap(() => {
                this.messageService.debugInfoPageRequest(this.pageNo);
                return this.productService.get(this.pageNo);
            }),
            tap(response => {
                this.setHasMore(response.more);
                if(!response.more) {
                    this.messageService.debugInfoNoMorePages(this.pageNo);
                }
            }),
            map(response => response.content),
            tap(products => {
                this.messageService.debugInfoPageResult(this.pageNo);
                this.addProducts(products);
                this.setLoading(false);
                this.pageNo++;
            }),
            catchError((err, caught) => {
                this.messageService.error(err);
                this.setLoading(false);
                return caught;
            })
        )
    });

    private readonly addProducts = this.updater((state, products: Product[]) => ({
        ...state,
        products: [ ...state.products, ...products ]
    }));

    private readonly setLoading = this.updater((state, loading: boolean) => ({
        ...state,
        loading
    }));

    private readonly setHasMore = this.updater((state, hasMore: boolean) => ({
        ...state,
        hasMore
    }));
}
