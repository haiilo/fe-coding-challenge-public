import {Component, OnInit} from "@angular/core";
import {ProductService} from "../service/product.service";
import {Page} from "../service/page";
import {Product} from "../service/product";
import { of, retry, concatMap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit{
  public nextPage: number = 0;
  public products: Page<Product> = { content: [], more: true };
  public isLoading = false;
  public error?: string | null;

  constructor(public readonly productService: ProductService) {}

  getPage() {
    this.isLoading = true;
    this.error = null;
    of(this.nextPage).pipe(
      concatMap((page) => this.productService.get(page)),
      retry(3)
    ).subscribe({
      next: (data: Page<Product>) => {
        this.products = {
          content: [...this.products.content, ...data.content],
          more: data.more,
        }
        this.nextPage += 1;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error;
        this.isLoading = false;
      }
    });
  }


  ngOnInit(): void {
    this.getPage();
  }
}
