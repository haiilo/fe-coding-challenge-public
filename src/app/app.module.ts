import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { MoreComponent } from './components/more/more.component';

@NgModule({
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent, 
    ProductComponent, 
    ProductsComponent, 
    MoreComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
