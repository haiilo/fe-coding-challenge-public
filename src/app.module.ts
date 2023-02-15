import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRouting} from './app.routing';
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppRouting,

    RouterModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
