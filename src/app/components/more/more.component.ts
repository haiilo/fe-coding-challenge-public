import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent {

  @Input() loading: boolean | null = false;
  @Input() couldLoadMore: boolean | null = false;

  @Output() loadMore: EventEmitter<void> = new EventEmitter();

  loadMoreProducts() {
    this.loadMore.emit();
  }
}
