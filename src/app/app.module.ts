import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [AppComponent, ProductCardComponent, HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
