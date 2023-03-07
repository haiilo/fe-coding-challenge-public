import { Component } from '@angular/core';
import { BehaviorSubject, catchError, merge, Observable, of, scan, switchMap, tap } from 'rxjs';
import { Page } from './products/page';
import { Product } from './products/product';
import { ProductService } from './products/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly productService: ProductService) {}

  // readonly products$: Observable<Page<Product>> = this.productService.get(0);

  public currentPage$ = new BehaviorSubject<number>(1);
  private _initList: Page<Product> = { more: true,  content: []};
  private initialList$ = of(this._initList);

  public productUpdate$ = this.currentPage$.pipe(
    tap(x=>{
      this.changeLoading();
    }),
    switchMap((currentPage)=> this.productService.get(currentPage))
      
  );

  public loading$: boolean = false;
  private changeLoading = ():boolean => this.loading$ = !this.loading$;
  // Merge the streams
  public products$ = merge(
      this.productUpdate$,
      this.initialList$
    ).pipe(
        // this.changeLoading(),
        scan((acc, value) => { 
          this.changeLoading();
          return {more: acc.more && value.more, content: acc.content.concat(value.content)}}),
        
      );

  public loadMore = ():void  => {
    this.currentPage$.next(this.currentPage$.value + 1); 
  }

  public refresh(): void {
    window.location.reload();
  }

  public goToLink(url: string): void {
    window.open(url, "_blank");
}

}
