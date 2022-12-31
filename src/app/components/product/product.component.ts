import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  noImageUrl = 'https://via.placeholder.com/400/888888/FFFFFF/?text=NoImage';

  @Input() product!: Product;

  constructor(
    private readonly messageService: MessageService
  ) {
  }

  openCategory(category: string) {
    this.messageService.debugInfoCategory(category);
  }
}
