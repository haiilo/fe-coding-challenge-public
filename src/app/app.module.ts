import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products-list/products.component';
import { ProductEffects } from './store/product/product.effects';
import * as ProductStore from "./store/product/product.reducer";
import { SNACKBAR_ERROR_DURATION } from './app.constants';

const material = [
  MatSnackBarModule,
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ProductsComponent,
    material,
    RouterModule.forRoot([
      {
        path: "",
        component: ProductsComponent,
      },
      {
        path: "**",
        redirectTo: "",
        pathMatch: "full",
      },
    ]),
    StoreModule.forRoot({
      "router": routerReducer,
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forFeature(ProductStore.FEATURE_KEY, ProductStore.productReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false
    }),
    EffectsModule.forRoot([ProductEffects]),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync(),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        horizontalPosition: 'left',
        verticalPosition: 'top',
        panelClass: 'snackbar__error',
        duration: SNACKBAR_ERROR_DURATION,
      },
    },
  ],
})
export class AppModule {}
