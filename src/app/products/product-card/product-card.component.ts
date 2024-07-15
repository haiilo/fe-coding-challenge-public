import { Component, Input } from '@angular/core';
import { IMAGE_PLACEHOLDER } from '../../utils/consts';
import { Product } from '../product';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
    @Input() product: Product = {} as Product;
    @Input() loading: boolean = false;

    readonly imagePlaceholder: string = IMAGE_PLACEHOLDER;

    goToCardUrl() {
        if (this.loading) return;
        window.open(this.product.url, '_blank');
    }
}
