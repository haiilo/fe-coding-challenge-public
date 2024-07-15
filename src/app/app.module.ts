import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LazyImgDirective } from './directives/lazy-load-image';
import { ErrorHandlingImgDirective } from './directives/on-error-image';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductsListComponent } from './products/products-list/products-list.component';

@NgModule({
    imports: [BrowserModule, CommonModule],
    declarations: [AppComponent, ProductCardComponent, LazyImgDirective, ErrorHandlingImgDirective, ProductsListComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
