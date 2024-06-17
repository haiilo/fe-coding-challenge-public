import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadCards,
  loadCardsSuccess,
  loadCardsFailure,
} from './cards.actions';
import { ProductService } from '../../products/product.service';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectAllCardsPage } from './cards.selectors';
import { AppState } from '../app.state';

@Injectable()
export class CardsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private productService: ProductService
  ) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCards),
      withLatestFrom(this.store.select(selectAllCardsPage)),
      switchMap(([action, page]) =>
        from(this.productService.get(page)).pipe(
          map((cards) => loadCardsSuccess({ cards: cards })),
          catchError((error) => of(loadCardsFailure({ error: error.toString() })))
        )
      )
    )
  );
}