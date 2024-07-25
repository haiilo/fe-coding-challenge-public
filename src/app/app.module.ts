import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [BrowserModule, CommonModule, RouterModule.forRoot([])],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
