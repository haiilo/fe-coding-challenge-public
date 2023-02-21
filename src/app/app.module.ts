import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { TruncatePipe } from './products/truncate.pipe';

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [AppComponent, ProductCardComponent, TruncatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
