import {Component, Input} from '@angular/core';
import {Product} from "../products/product";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
 @Input() title = '';
 @Input() cover: string | null = '';
 @Input() body = '';
 @Input() url = '';

 public onClick(url: string) {
   if (url) {
     window.open(url, "_blank");
   } else {
     console.warn("Mising URL.")
   }
 }
}
