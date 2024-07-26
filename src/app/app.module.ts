import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { PageLoaderComponent, ProductComponent } from './components';

@NgModule({
  imports: [BrowserModule, CommonModule, RouterModule.forRoot([])],
  declarations: [AppComponent, PageLoaderComponent, ProductComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
