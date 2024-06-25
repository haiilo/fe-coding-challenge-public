import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CardImageComponent } from './card-image/card-image.component';
import { TagsComponent } from './tags/tags.component';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [AppComponent, CardComponent, CardImageComponent, TagsComponent ],
  bootstrap: [AppComponent]
})
export class AppModule {}
