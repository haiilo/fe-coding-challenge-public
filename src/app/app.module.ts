import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [AppComponent, CardComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
