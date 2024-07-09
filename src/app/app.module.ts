import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';
import { LoadingSpinnerModule } from './shared';

@NgModule({
  imports: [
    BrowserModule, 
    CommonModule,
    HttpClientModule,
    CoreModule,
    LoadingSpinnerModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
