import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';

@NgModule({
  imports: [BrowserModule, CommonModule, ProductsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
