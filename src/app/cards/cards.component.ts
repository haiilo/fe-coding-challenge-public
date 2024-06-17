import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllCards, selectAllCardsStatus, selectAllCardsError } from '../state/cards/cards.selectors';
import { AppState } from '../state/app.state';
import { loadCards } from '../state/cards/cards.actions';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  public allCards$ = this.store.select(selectAllCards);
  public allCardsStatus$ = this.store.select(selectAllCardsStatus);
  public allCardsError$ = this.store.select(selectAllCardsError);

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.loadMore();
  }

  goToUrl(url: string) {
    window.open(url, "_blank");
  }

  loadMore() {
    this.store.dispatch(loadCards());
  }
}
