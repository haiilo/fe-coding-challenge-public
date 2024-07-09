import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { AppRoutingModule } from './app-routing.module';
import { LoadingInterceptor } from './services/loading.interceptor';

@NgModule({
  imports: [
    BrowserModule, 
    CommonModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent, 
    LoadingSpinnerComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
