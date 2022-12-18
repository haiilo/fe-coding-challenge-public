import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, catchError, EMPTY, exhaustMap, Observable, of, Subject } from "rxjs";
import { Product } from "./product";
import { ProductService } from "./product.service";

@Injectable({
    providedIn: 'root',
})
export class ProductProvider {

    private productsSubject = new BehaviorSubject<Product[]>([]);
    private hasMoreSubject = new BehaviorSubject<boolean>(false);
    private loadMoreSubject = new Subject<void>();

    products$: Observable<Product[]> = this.productsSubject.asObservable();
    hasMore$: Observable<boolean> = this.hasMoreSubject.asObservable();

    crtPageNumber: number = 0;

    constructor(
        private readonly productService: ProductService,
        private readonly toastr: ToastrService
    ) {
        this.loadMoreSubject.asObservable()
            .pipe(
                exhaustMap(() => {
                    toastr.info(`Send request for page '${this.crtPageNumber}'.`, 'Page Number')
                    return this.productService.get(this.crtPageNumber);
                }),
                catchError((err, caught) => {
                    toastr.error(err.message, 'Error');
                    return caught;
                })
            ).subscribe({
                next: page => {
                    const products = [ ...this.productsSubject.getValue(), ...page.content ];
                    this.productsSubject.next(products);
                    this.hasMoreSubject.next(page.more);
                    this.crtPageNumber++;
                    if(!page.more) {
                        toastr.info(`No more products after ${this.crtPageNumber} pages.`, 'No More Products')
                    }
                },
                error: (err) => toastr.error('There is no error here!', 'Error2')
        });

        this.loadMore();
    }

    loadMore() {
        this.loadMoreSubject.next();
    }
}
   