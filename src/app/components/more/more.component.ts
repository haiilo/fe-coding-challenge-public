import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent {

  @Input() loading: boolean = false;
  @Input() hasMore: boolean = false;
}
