import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductsGridComponent } from './products/components/products-grid/products-grid.component';

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [AppComponent, ProductsGridComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
