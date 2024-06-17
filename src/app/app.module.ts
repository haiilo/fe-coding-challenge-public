import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CheckImage } from "./pipes/check-image.pipe";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CardsComponent } from './cards/cards.component';
import { cardsReducer } from './state/cards/cards.reducer';
import { CardsEffects } from './state/cards/cards.effects';

@NgModule({
  imports: [
    BrowserModule, 
    CommonModule, 
    AppRoutingModule,
    StoreModule.forRoot({ cards: cardsReducer }),
    EffectsModule.forRoot([CardsEffects]),
  ],
  declarations: [
    AppComponent, 
    CardsComponent,
    CheckImage
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
