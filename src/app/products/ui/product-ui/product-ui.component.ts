import { Component, Input } from "@angular/core";
import { Product } from "../../../shared/models/product";

@Component({
  selector: 'app-product-ui',
  templateUrl: './product-ui.component.html',
  styleUrls: ['./product-ui.component.scss']
})

export class ProductUi {
  @Input() product: Product | null = null;
}
