import { Component, OnInit } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';
import { Page } from '../page';
import { Product } from '../product';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  errorMessage: string = '';
  productArray: Product[] = [];
  pageNumber: number = 0;
  loading$ = new BehaviorSubject(false);
  loadMoreValues: boolean = true;

  constructor(private readonly productService: ProductService, private spinner: NgxSpinnerService) {}
  readonly products$: Observable<Page<Product>> = this.productService.get(0);
  
  ngOnInit(): void {
    // on init, we want to populate the productArray with the results of the first page
    // we display a nice loading spinner until the call is finished; I have used ngx-spinner as it looks very cool:)
    // in case of an error, we display a short message
    this.spinner.show();
    this.loading$.next(true); // used to hide the Load more button on initial page loading

    this.products$.subscribe({
      next: product => {
        this.productArray = product.content;
        this.loadMoreValues = product.more;
      },
      error: () => {
        this.errorMessage = 'Something went bad:( Please reload the page!';
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
        this.loading$.next(false);
      }
    })
  }

  // handleMissingImage(event: Event) {
  //   (event.target as HTMLImageElement).style.display = 'none';
  // }

  loadMore(more: boolean, page: number): void {
    // loadMore function subscribes to the get() from product service and concats the response to the productArray;
    // each time we click the Load more button, we increment the pageNumber
    // in case of error, an error message is displayed
    // when the last page is reached (i.e. loadMoreValues is false), the Load more button is disabled 
    if(more) {
      this.spinner.show();
      this.productService.get(page).subscribe({
        next: product => {
          this.productArray = this.productArray.concat(product.content);
          this.pageNumber++;
          this.loadMoreValues = product.more;
          this.errorMessage = '';
        },
        error: () => {
          this.errorMessage = 'Something went bad:( Please try again!';
          this.spinner.hide();
        },
        complete: () => {
          this.spinner.hide();
        }
      })
    }
  }

  openCardUrl(url: string) {
    // simply open a new web page if we have an url provided on card click
    url ? window.open(url, "_blank") : null;
  }
}
